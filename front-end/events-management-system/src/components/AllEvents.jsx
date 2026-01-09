import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Button from "../blocks/Button";
import Professional from "../blocks/Professional";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../services/backendService";
import { postApplyEvent } from "../services/backendService";
import { getApplyEvents } from "../services/backendService";
import { toast } from "react-toastify";
const AllEvents = () => {
  const navigate = useNavigate("");
  const [appliedEvents, setAppliedEvents] = useState([]);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchAllEvents = async () => {
      const hereWeGo = await fetchEvents();
      if (hereWeGo && Array.isArray(hereWeGo)) {
        setEvents(hereWeGo);
      }
    };
    fetchAllEvents();
  }, []);

  const handleApply = async (eventId) => {
    console.log("Applying to event ID:", eventId);
    const responce = await postApplyEvent(eventId);
    if (!responce.error) {
      setAppliedEvents((prev) => [...prev, eventId]);
    }
    if (responce.error) {
      toast.error(responce.error, {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    const fetchAppliedEvents = async () => {
      const applied = await getApplyEvents();
      console.log("Applied events fetched:", applied);
      if (applied && Array.isArray(applied)) {
        setAppliedEvents(applied.map((a) => a._id));
      }
    };
    fetchAppliedEvents();
  }, []);
  return (
    <div className="bg-linear-to-br from-indigo-50 to-white py-10">
      <Professional>
        <div className="flex items-center mb-10 ">
          <button
            className="text-indigo-600 hover:text-indigo-700 cursor-pointer p-2 hover:bg-blue-300 transition-all rounded-full"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={25} color="#3949ab" strokeWidth={2.25} />
          </button>
          <div className="mx-auto">
            <h1 className="md:text-4xl text-2xl font-bold  text-indigo-600">
              Available Events
            </h1>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          {events.length === 0 ? (
            <div className="text-center text-gray-500 mt-[10%]">
              <p className="text-lg">Events are not Available!</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <motion.div
                  key={event._id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={event.image}
                    alt={event.eventName}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-6 space-y-3">
                    <h2 className="md:text-2xl text-xl font-semibold text-gray-800">
                      {event.eventName}
                    </h2>
                    <div className="flex items-center text-gray-500 text-sm">
                      <CalendarDays className="w-4 h-4 mr-2 text-indigo-500" />
                      {event.formattedDate}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                      {event.formattedTime}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                      {event.location}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {event.description}
                    </p>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleApply(event._id)}
                      disabled={appliedEvents.includes(event._id)}
                      className={`w-full mt-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                        appliedEvents.includes(event._id)
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      }`}
                    >
                      {appliedEvents.includes(event._id)
                        ? "✅ Applied"
                        : "Apply Now"}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </Professional>
    </div>
  );
};

export default AllEvents;
