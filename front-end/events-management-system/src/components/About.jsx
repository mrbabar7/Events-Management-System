import React from "react";
import Professional from "../blocks/Professional";
const About = () => {
  return (
    <div className="bg-linear-to-r from-indigo-50 to-blue-50 py-10">
      <Professional className={"text-center"}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-6 ">
          About Our Event Management System
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10">
          Welcome to our Event Management Platform — a modern and intuitive
          system designed to simplify the process of organizing and
          participating in events. Whether you're hosting an event or applying
          to join one, our system provides a seamless experience for everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">
              🎯 Our Mission
            </h3>
            <p className="text-gray-600">
              To connect people through organized, engaging, and easy-to-access
              events — bringing creativity, learning, and networking to
              everyone.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">
              💡 Our Vision
            </h3>
            <p className="text-gray-600">
              To become the leading digital platform for event management,
              empowering individuals and organizations to plan, register, and
              participate effortlessly.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">
              🤝 Why Choose Us
            </h3>
            <p className="text-gray-600">
              Because we prioritize simplicity, security, and a user-friendly
              interface that makes managing events a stress-free experience for
              all.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="md:text-3xl text-2xl font-bold text-gray-800 mb-4">
            Made with ❤️ for Event Enthusiasts
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This platform is built using modern technologies like React.js,
            Tailwind CSS, and Node.js — ensuring speed, scalability, and a
            delightful user experience. Whether you're hosting a tech talk, a
            music concert, or a university event — this system is here for you.
          </p>
        </div>
      </Professional>
    </div>
  );
};

export default About;
