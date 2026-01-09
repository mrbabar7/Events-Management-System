import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Trash2 } from "lucide-react";
import { getApplyEvents, postUnapplyEvent } from "../services/backendService";
import { toast } from "react-toastify";
const MyEvents = () => {
  // 🧩 Dummy applied events (later you’ll fetch these from MongoDB)
  const [appliedEvents, setAppliedEvents] = useState([]);
  useEffect(() => {
    const fetchAppliedEvents = async () => {
      const applied = await getApplyEvents();
      console.log("Applied events fetched:", applied);
      if (applied && Array.isArray(applied)) {
        setAppliedEvents(applied);
      }
    };
    fetchAppliedEvents();
  }, []);
  // 🗑️ Function to remove an event from the list
  const handleUnapply = async (eventId) => {
    const result = await postUnapplyEvent(eventId);
    if (result.error) {
      toast.error(result.error, {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      setAppliedEvents((prev) => prev.filter((event) => event._id !== eventId));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {appliedEvents.length === 0 ? (
        <div className="text-center text-gray-500 mt-[10%]">
          <p className="text-lg">You haven’t applied for any events yet.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {appliedEvents.map((event) => (
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
                <div className="mt-3 py-2">
                  {event.status === "pending" ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleUnapply(event._id)}
                      className="w-full py-2 rounded-lg font-semibold transition-all bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
                      Unapply
                    </motion.button>
                  ) : (
                    <div className="shadow-lg  text-center">
                      <p
                        className={`p-2 rounded-full text-sm font-medium
                      ${
                        event.status === "approved"
                          ? "bg-green-800 text-white"
                          : "bg-red-800 text-white"
                      }`}
                      >
                        {event.status}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyEvents;
