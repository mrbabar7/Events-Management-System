import React, { useState } from "react";
import { motion } from "framer-motion";
import RegisteredEvents from "./RegisteredEvents";
import MyEvents from "./MyEvents";
import { ArrowLeft, Calendar, Layers } from "lucide-react";
import Professional from "../blocks/Professional";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("registered");
  const navigate = useNavigate();
  return (
    <div className="bg-blue-200 py-10">
      <Professional>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          <div className="flex flex-col md:flex-row">
            <div className="flex items-center  gap-2 mb-6 md:mb-0">
              <button
                onClick={() => navigate("/")}
                className="text-indigo-600 hover:text-indigo-700 cursor-pointer p-1 rounded-full hover:bg-blue-300 transition-colors font-medium"
              >
                <ArrowLeft size={20} />
              </button>
              <span className="text-indigo-600 font-medium">Back</span>
            </div>
            <div className="bg-white shadow-md rounded-xl overflow-hidden  flex mx-auto">
              <button
                onClick={() => setActiveTab("registered")}
                className={`md:px-6 px-2 py-3 flex items-center md:gap-2 gap-1  font-medium text-sm md:text-base 
                  transition-all cursor-pointer ${
                    activeTab === "registered"
                      ? "bg-purple-600 text-white"
                      : "text-gray-600 hover:bg-purple-100"
                  }`}
              >
                <Calendar className="md:w-5 w-4 md:h-5 h-4" />
                Registered Events
              </button>
              <button
                onClick={() => setActiveTab("applied")}
                className={`md:px-6 px-2 py-3 flex items-center md:gap-2 gap-1 font-medium text-sm md:text-base
                   transition-all cursor-pointer ${
                     activeTab === "applied"
                       ? "bg-purple-600 text-white"
                       : "text-gray-600 hover:bg-purple-100"
                   }`}
              >
                <Layers className="md:w-5 w-4 md:h-5 h-4" />
                Applied Events
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="mt-8">
            {activeTab === "registered" ? <RegisteredEvents /> : <MyEvents />}
          </div>
        </motion.div>
      </Professional>
    </div>
  );
};

export default UserProfile;
