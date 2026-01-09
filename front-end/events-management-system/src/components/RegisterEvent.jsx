import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "../blocks/Loader";
import { CalendarDays, Clock, MapPin, FileText, Image } from "lucide-react";
import Professional from "../blocks/Professional";
import Button from "../blocks/Button";
import { useNavigate } from "react-router-dom";
import { postEvent } from "../services/backendService";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
const RegisterEvent = () => {
  const navigate = useNavigate("");
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleImageUpload = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f)); // preview
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setErrorMsg("");
    setLoading(true);
    const fd = new FormData();
    fd.append("eventName", formData.eventName);
    fd.append("date", formData.date);
    fd.append("time", formData.time);
    fd.append("location", formData.location);
    fd.append("description", formData.description || "");
    fd.append("image", file);
    const responce = await postEvent(fd);
    console.log("Server Responce:", responce);
    setTimeout(() => {
      setLoading(false);
      if (responce) {
        if (responce.apiError) {
          console.log("Server Responce Messages:", responce.apiError);
          setErrorMsg(responce.apiError);
        }
        if (responce.errors && Array.isArray(responce.errors)) {
          console.log("Server Responce Errors:", responce.errors);
          const map = {};
          responce.errors.forEach((err) => {
            // err expected shape: { param, msg }
            if (err && err.param) map[err.param] = err.msg;
          });
          setFieldErrors(map);
        }
        if (
          !responce.apiError &&
          !(responce.errors && responce.errors.length)
        ) {
          setErrorMsg("");
          setFieldErrors({});
          setFormData({
            eventName: "",
            date: "",
            time: "",
            location: "",
            description: "",
          });
          setFile(null);
          setPreview(null);
          navigate("/dashbord");
          toast.success("Event registered successfully!", {
            position: "bottom-right",
            autoClose: 2000,
            theme: "colored",
          });
        }
      } else {
        setErrorMsg("There is Something wrong! Please try again.");
      }
    }, 1000);
  };

  return (
    <div className="bg-blue-200 py-10">
      <Professional>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          {loading && (
            <Loader>
              <BeatLoader color="#4F46E5" size={20} />
            </Loader>
          )}
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl md:p-8 px-4 py-8 border border-gray-100">
            <h1 className="md:text-3xl text-2xl font-bold text-indigo-600 mb-6 text-center">
              Register a New Event
            </h1>

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-5"
            >
              {/* Event Name */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Event Name
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
                  <FileText className="text-indigo-500 mr-2" size={20} />
                  <input
                    type="text"
                    name="eventName"
                    placeholder="Enter event name"
                    value={formData.eventName}
                    onChange={handleChange}
                    className="w-full outline-none text-gray-800"
                  />
                </div>
                {fieldErrors.eventName && (
                  <span className="text-red-700 text-sm">
                    {fieldErrors.eventName}
                  </span>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Date
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
                  <CalendarDays className="text-indigo-500 mr-2" size={20} />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full outline-none text-gray-800"
                  />
                </div>
                {fieldErrors.date && (
                  <span className="text-red-700 text-sm">
                    {fieldErrors.date}
                  </span>
                )}
              </div>

              {/* Time */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Time
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
                  <Clock className="text-indigo-500 mr-2" size={20} />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full outline-none text-gray-800"
                  />
                </div>
                {fieldErrors.time && (
                  <span className="text-red-700 text-sm">
                    {fieldErrors.time}
                  </span>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Location
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
                  <MapPin className="text-indigo-500 mr-2" size={20} />
                  <input
                    type="text"
                    name="location"
                    placeholder="Event location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full outline-none text-gray-800"
                  />
                </div>
                {fieldErrors.location && (
                  <span className="text-red-700 text-sm">
                    {fieldErrors.location}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Event Image
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <Image className="text-indigo-500 mr-2" />
                  <label className="w-full outline-none text-gray-800 cursor-pointer">
                    {!file ? "Upload image" : file.name}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {fieldErrors.image && (
                  <span className="text-red-700 text-sm">
                    {fieldErrors.image}
                  </span>
                )}

                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-32 h-32 object-cover mt-3 rounded-lg shadow"
                  />
                )}
              </div>
              {/* Description */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Brief description about the event"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border rounded-lg px-3 py-2 outline-none text-gray-800 focus:ring-2 focus:ring-indigo-400"
                ></textarea>
                {fieldErrors.description && (
                  <span className="text-red-700 text-sm">
                    {fieldErrors.description}
                  </span>
                )}
              </div>

              {/* Error or Success Message */}
              {errorMsg && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative">
                  <p className="text-red-700 text-md font-medium text-center">
                    {errorMsg}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all"
              >
                Submit Event
              </motion.button>
            </form>
          </div>
          <div className="my-10">
            <Button
              className="text-white hover:bg-indigo-700"
              disabled={loading}
              onClick={() => navigate("/")}
            >
              Back to Home Page
            </Button>
          </div>
        </motion.div>
      </Professional>
    </div>
  );
};

export default RegisterEvent;
