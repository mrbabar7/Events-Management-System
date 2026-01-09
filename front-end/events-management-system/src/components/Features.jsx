import React from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck2,
  UserPlus,
  Users,
  BellRing,
  Settings,
  BarChart,
  ClipboardList,
} from "lucide-react";
import Professional from "../blocks/Professional";
const Features = () => {
  const featureList = [
    {
      icon: <UserPlus className="w-10 h-10 text-purple-600" />,
      title: "Event Registration",
      desc: "Easily register new events with essential details like title, description, date, venue, and more using a simple and intuitive interface.",
    },
    {
      icon: <ClipboardList className="w-10 h-10 text-pink-500" />,
      title: "Apply for Events",
      desc: "Users can browse through available events and apply instantly to participate — hassle-free and fast!",
    },
    {
      icon: <CalendarCheck2 className="w-10 h-10 text-indigo-500" />,
      title: "View Registered Events",
      desc: "Check all the events you’ve registered, including pending and approved events, in a single view.",
    },
    {
      icon: <Users className="w-10 h-10 text-emerald-500" />,
      title: "Manage Participants",
      desc: "Admins and organizers can manage participants, approve or reject applications, and monitor attendance easily.",
    },
    {
      icon: <BellRing className="w-10 h-10 text-yellow-500" />,
      title: "Real-time Notifications",
      desc: "Stay updated with real-time event notifications about approvals, updates, and reminders.",
    },
    {
      icon: <Settings className="w-10 h-10 text-cyan-500" />,
      title: "Admin Dashboard",
      desc: "Powerful admin panel to control system functionalities like managing events, users, and data analytics.",
    },
    {
      icon: <BarChart className="w-10 h-10 text-rose-500" />,
      title: "Analytics and Reports",
      desc: "Generate insightful reports on event performance, user participation, and trends with visual analytics.",
    },
  ];

  return (
    <div className="bg-linear-to-br from-purple-50 via-white to-pink-50 py-10">
      <Professional>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-700 mb-4">
            Powerful Features for Seamless Event Management
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Our EMS provides everything you need to organize, apply, and manage
            events — all in one place.
          </p>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureList.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 text-center flex flex-col items-center"
              >
                <div className="mb-4 bg-purple-50 p-4 rounded-full shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Professional>
    </div>
  );
};

export default Features;
