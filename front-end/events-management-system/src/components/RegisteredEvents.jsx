import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Button from "../blocks/Button";
import { useNavigate } from "react-router-dom";
import { fetchMyEvents } from "../services/backendService";
const RegisteredEvents = () => {
  const navigate = useNavigate();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const responce = await fetchMyEvents();
      console.log("My registered events:", responce);
      if (responce && Array.isArray(responce)) {
        setRegisteredEvents(responce);
      }
    };
    fetchEvents();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {registeredEvents.length === 0 ? (
        <div className="text-center text-gray-500 mt-[10%]">
          <p className="text-lg">You haven’t registered any events yet.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {registeredEvents.map((event) => (
            <motion.div
              key={event._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-6 space-y-3">
                <h2 className="md:text-2xl text-xl font-semibold text-gray-800">
                  {event.eventName}
                </h2>

                <div className="flex items-center text-gray-500 text-sm">
                  <CalendarDays className="w-4 h-4 mr-2 text-purple-500" />
                  {event.formattedDate}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-2 text-purple-500" />
                  {event.formattedTime}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                  {event.location}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {event.description}
                </p>
                <div className="mt-4">
                  <Button
                    className={"text-white w-full"}
                    onClick={() => navigate(`/event-details/${event._id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RegisteredEvents;
