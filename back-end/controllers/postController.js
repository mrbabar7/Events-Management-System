const EventModel = require("../models/eventModel");
const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Helper: format date as '7 Oct 2025'
function formatDateShort(dateVal) {
  if (!dateVal) return "";
  const d = new Date(dateVal);
  if (isNaN(d)) return String(dateVal);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

// Helper: format time string like '07:14' or '7:14' => '7:14 am'
function formatTimeShort(timeStr) {
  if (!timeStr) return "";
  // If timeStr includes AM/PM already, normalize to lowercase
  const maybe = String(timeStr).trim();
  if (/[ap]m$/i.test(maybe)) return maybe.toLowerCase();

  const [hh, mm] = maybe.split(":");
  if (typeof hh === "undefined") return maybe;
  let h = parseInt(hh, 10);
  const minutes = (mm || "00").slice(0, 2);
  if (isNaN(h)) return maybe;
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  return `${h}:${minutes} ${ampm}`;
}

exports.postEvent = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    console.log("postEvent for user id:", userId);
    const { eventName, date, time, location, description } = req.body || {};

    // Validation helpers
    const errors = [];
    const pushErr = (param, msg) => errors.push({ param, msg });

    if (typeof eventName !== "string" || eventName.trim() === "") {
      pushErr("eventName", "Event name is required!");
    }

    // Ensure field contains at least one letter (not only numbers)
    if (typeof eventName === "string" && !/[A-Za-z0-9]/.test(eventName)) {
      pushErr("eventName", "Event name must contain letters!");
    }

    if (typeof location !== "string" || location.trim() === "") {
      pushErr("location", "Location is required!");
    }

    if (typeof location === "string" && !/[A-Za-z]/.test(location)) {
      pushErr("location", "Location must contain letters!");
    }

    if (typeof description !== "string" || description.trim() === "") {
      pushErr("description", "Description is required!");
    }

    if (typeof description === "string" && !/[A-Za-z0-9]/.test(description)) {
      pushErr("description", "Description must contain letters!");
    }

    // Date validation
    if (!date) {
      pushErr("date", "Date is required!");
    } else {
      const d = new Date(date);
      if (isNaN(d.getTime())) {
        pushErr("date", "Date must be a valid date!");
      }
    }

    // Time validation - accept HH:MM (24h) or H:MM am/pm
    function isValidTime(t) {
      if (!t) return false;
      const s = String(t).trim();
      const re24 = /^([01]?\d|2[0-3]):[0-5]\d$/; // 00:00 - 23:59
      const re12 = /^(0?[1-9]|1[0-2]):[0-5]\d\s?(am|pm)$/i; // 1:00 am - 12:59 pm
      return re24.test(s) || re12.test(s);
    }

    if (!time || !isValidTime(time)) {
      pushErr("time", "Time is required and must be a valid time!");
    }

    const img = req.files && req.files.image;
    if (!img) {
      pushErr("image", "Event image is required!");
    }

    if (errors && errors.length > 0) {
      console.log("postEvent validation errors:", errors);
      return res.status(422).json({ errors });
    }

    // At this point validation passed - upload image if present
    let imageUrl = "";
    if (img) {
      try {
        const imgFile = await cloudinary.uploader.upload(img.tempFilePath);
        imageUrl = imgFile.secure_url;
      } catch (uploadErr) {
        console.error("cloudinary upload error:", uploadErr);
        return res
          .status(500)
          .json({ message: "Image upload failed", error: uploadErr.message });
      }
    }

    // Ensure date is stored as a Date object
    const eventDate = date ? new Date(date) : undefined;
    const eventTime = time ? String(time).trim() : "";

    const event = new EventModel({
      eventName: eventName.trim(),
      image: imageUrl,
      date: eventDate,
      time: eventTime,
      location: location.trim(),
      description: description.trim(),
      userId,
    });
    await event.save();
    res.status(201).json({
      message: "Event Registered Successfully!",
      event,
    });
  } catch (error) {
    console.error("postEvent error:", error);
    res.status(500).json({
      apiError: error.apiError || "There is something wrong!",
    });
  }
};

exports.updateEvent = async (req, res, next) => {
  const { eventId, eventName, date, time, location, description } = req.body;
  console.log("updateEvent for event id:", eventId);
  try {
    // Check if there's an image to upload
    let imageUrl = undefined;
    if (req.files && req.files.image) {
      const img = req.files.image;
      const imgFile = await cloudinary.uploader.upload(img.tempFilePath);
      imageUrl = imgFile.secure_url;
    }

    // Ensure date is stored as a Date object if provided
    const updateData = {
      eventName: eventName || undefined,
      location: location || undefined,
      description: description || undefined,
      time: time ? String(time).trim() : undefined,
    };

    if (imageUrl) {
      updateData.image = imageUrl;
    }

    if (date) {
      updateData.date = new Date(date);
    }

    // Remove undefined fields
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Add formatted date/time to response
    const eventObj = updatedEvent.toObject
      ? updatedEvent.toObject()
      : updatedEvent;
    eventObj.formattedDate = formatDateShort(eventObj.date);
    eventObj.formattedTime = formatTimeShort(eventObj.time);

    res.status(200).json({
      message: "Event updated successfully",
      event: eventObj,
    });
  } catch (error) {
    console.log("error while updating event:", error);
    res.status(500).json({
      message: error.message || "Failed to update event",
    });
  }
};
