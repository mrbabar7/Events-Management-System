import React from "react";
import { motion } from "framer-motion";
import Button from "../blocks/Button";
import Professional from "../blocks/Professional";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate("");
  const features = [
    {
      title: "Fast Performance",
      desc: "Experience lightning-fast load times with our optimized design.",
      icon: "⚡",
    },
    {
      title: "Secure Data",
      desc: "Your privacy and security are our top priority.",
      icon: "🔒",
    },
    {
      title: "User Friendly",
      desc: "An intuitive and easy-to-use interface for everyone.",
      icon: "🎨",
    },
  ];
  return (
    <>
      <Professional>
        <div className="flex flex-col md:flex-row items-center justify-between py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Welcome to <span className="text-indigo-600">EMS</span>
            </h2>
            <p className="text-gray-600 mb-8">
              The place where innovation meets simplicity. Manage your data,
              explore smart tools, and experience a seamless user interface.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Button
                className="text-white hover:bg-indigo-700"
                onClick={() => navigate("register-event")}
              >
                Register Event
              </Button>

              <Button
                className="bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
                onClick={() => navigate("events")}
              >
                Apply for Event
              </Button>
            </div>
          </motion.div>

          <motion.img
            src="../src/assets/enternal-bgt.png"
            alt="EMS IMG"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 mt-8 md:mt-0"
          />
        </div>
        <div className="md:my-8 my-4 md:py-10 py-6">
          <div className="text-center md:mb-15 mb-10">
            <h3 className="md:text-3xl text-2xl font-bold text-gray-800">
              Our Key Features
            </h3>
            <p className="text-gray-600 mt-2">What makes us different?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-indigo-50 md:p-8 p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="md:text-4xl text-2xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Professional>
      <div className="bg-blue-300">
        <Professional>
          <div className="flex flex-col md:flex-row items-center gap-10 md:py-10 py-6">
            <img
              src="../src/assets/external.png"
              alt="About Illustration"
              className="w-full md:w-1/2"
            />
            <div>
              <h3 className="md:text-3xl text-2xl font-bold text-gray-800 mb-4">
                About Our Application
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our application is designed to make your daily tasks easier.
                Whether you're managing attendance, handling users, or exploring
                analytics — everything is right at your fingertips with our
                smart interface.
              </p>
              <Button
                className={"text-white hover:bg-indigo-700"}
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </Professional>
      </div>
    </>
  );
};

export default HomePage;
