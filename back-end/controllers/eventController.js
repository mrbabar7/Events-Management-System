const EventModel = require("../models/eventModel");
const AppModel = require("../models/appModel");
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

exports.fetchEvents = async (req, res, next) => {
  // Get current user id if available (safe access)
  const sessionUser = req.session && req.session.user ? req.session.user : null;
  const currentUserId = sessionUser ? String(sessionUser._id) : null;
  console.log("fetchEvents — currentUserId:", currentUserId || "(none)");

  try {
    // Use .lean() to return plain objects
    const allEvents = await EventModel.find().lean();
    console.log("fetchEvents — total events:", allEvents.length);

    // Filter out events created by current user (if we have a user id)
    const visibleEvents = allEvents.filter((ev) => {
      if (!currentUserId) return true;
      if (!ev) return false;
      // Normalize event.userId which may be ObjectId or a populated object
      let evUserId = null;
      if (ev.userId && typeof ev.userId === "object") {
        evUserId = ev.userId._id ? String(ev.userId._id) : String(ev.userId);
      } else {
        evUserId = ev.userId ? String(ev.userId) : null;
      }
      return evUserId !== currentUserId;
    });

    const formatted = visibleEvents.map((e) => ({
      ...e,
      formattedDate: formatDateShort(e.date),
      formattedTime: formatTimeShort(e.time),
    }));

    console.log("fetchEvents — returning count:", formatted.length);
    return res.status(200).json(formatted);
  } catch (error) {
    console.error("fetchEvents error:", error);
    return res.status(500).json({ message: error.message });
  }
};
exports.fetchMyEvents = async (req, res, next) => {
  const userId = req.session.user._id;
  const myEvents = await EventModel.find({ userId });
  const formatted = myEvents.map((ev) => {
    const e = ev.toObject ? ev.toObject() : ev;
    return {
      ...e,
      formattedDate: formatDateShort(e.date),
      formattedTime: formatTimeShort(e.time),
    };
  });
  res.status(200).json(formatted);
};
exports.deleteEvent = async (req, res, next) => {
  const { eventId } = req.body;
  try {
    await EventModel.findByIdAndDelete(eventId);
    await AppModel.deleteMany({ eventId });
    res.status(200).json({ message: "Event is deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.fetchEventDetails = async (req, res, next) => {
  const { eventId } = req.params;
  console.log("fetchEventDetails for event id:", eventId);
  try {
    const event = await EventModel.findById(eventId);
    const applications = await AppModel.find({ eventId })
      .populate("userId", "userName email contact") // Fetch user details
      .lean();
    console.log("Fetched applications:", applications);
    const eventArray = event ? [event] : [];
    console.log("Fetched event:", event);
    const formatted = eventArray.map((ev) => {
      const e = ev.toObject ? ev.toObject() : ev;
      return {
        ...e,
        formattedDate: formatDateShort(e.date),
        formattedTime: formatTimeShort(e.time),
      };
    });
    const formattedApplications = applications.map((app) => ({
      ...app,
      user: app.userId, // Rename for frontend clarity
    }));
    res
      .status(200)
      .json({ event: formatted, applications: formattedApplications });
  } catch (error) {
    console.log("error while fetching event details :", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.postApplyEvent = async (req, res, next) => {
  const { eventId } = req.body;
  const userId = req.session.user._id;
  try {
    const application = new AppModel({
      eventId,
      userId,
      status: "pending",
    });
    await application.save();
    res.status(200).json({ message: "Application received" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "There is something wrong!" });
  }
};
exports.postUnapplyEvent = async (req, res, next) => {
  const { eventId } = req.body;
  const userId = req.session.user._id;
  try {
    await AppModel.deleteOne({ eventId, userId });
    res.status(200).json({ message: "Unapplied from event" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "There is something wrong!" });
  }
};
exports.getApplyEvents = async (req, res, next) => {
  const userId = req.session.user._id;
  const applications = await AppModel.find({ userId });
  const eventIds = applications.map((app) => app.eventId);
  const events = await EventModel.find({ _id: { $in: eventIds } });
  const statusMap = {};
  applications.forEach((app) => {
    statusMap[app.eventId.toString()] = app.status;
  });
  const formatted = events.map((ev) => {
    const e = ev.toObject ? ev.toObject() : ev;
    return {
      ...e,
      status: statusMap[e._id.toString()],
      formattedDate: formatDateShort(e.date),
      formattedTime: formatTimeShort(e.time),
    };
  });
  res.status(200).json(formatted);
};
exports.postAppStatus = async (req, res, next) => {
  const { appId, status } = req.body;
  console.log(
    "postAppStatus for application id:",
    appId,
    "with status:",
    status
  );
  const application = await AppModel.findById(appId);
  application.status = status;
  await application.save();
  res.status(200).json({ message: "Status updated" });
};
