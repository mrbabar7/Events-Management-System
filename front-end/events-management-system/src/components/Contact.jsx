import React from "react";
import Professional from "../blocks/Professional";
const Contact = () => {
  return (
    <div className="bg-linear-to-r from-blue-50 to-indigo-50 py-10">
      <Professional className={"text-center"}>
        <h2 className="md:text-4xl lg:text-5xl text-3xl font-bold text-center text-blue-600 mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          Have questions, feedback, or partnership ideas? We’d love to hear from
          you! Fill out the form below and our team will get in touch shortly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 overflow-hidden">
          {/* Left Side - Info Section */}
          <div className="flex flex-col justify-center bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Get in Touch
            </h3>
            <p className="text-gray-600 mb-6">
              Whether you’re looking to host an event, participate, or simply
              learn more about our system — our support team is here to help.
            </p>

            <div className="space-y-4 text-gray-700">
              <p>
                📍 <span className="font-medium">Location:</span> Lahore,
                Pakistan
              </p>
              <p>
                📞 <span className="font-medium">Phone:</span> +92 307 6840971
              </p>
              <p>
                📧 <span className="font-medium">Email:</span>{" "}
                abubakrkhanbabar838@gmail.com
              </p>
              <p>
                🕒 <span className="font-medium">Working Hours:</span> Mon–Fri,
                9:00 AM – 6:00 PM
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </Professional>
    </div>
  );
};

export default Contact;
