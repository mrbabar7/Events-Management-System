import { useState } from "react";
import Button from "../blocks/Button";
import { postSignUp } from "../services/authService";

const SignUp = ({ setModalChild }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    contact: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setErrors({});

    try {
      const response = await postSignUp(formData);
      console.log("Server response:", response); // Debug log

      // Handle validation errors (422 status)
      if (response.errors && Array.isArray(response.errors)) {
        const backendErrors = {};

        const inferField = (msg) => {
          const m = (msg || "").toLowerCase();
          if (m.includes("user") || m.includes("name")) return "userName";
          if (m.includes("email")) return "email";
          if (m.includes("contact") || m.includes("phone")) return "contact";
          if (m.includes("password")) return "password";
          return "_global";
        };

        response.errors.forEach((error) => {
          // Some backends may not include `param`; fall back to inference from message
          const key = error.param || inferField(error.msg || "");
          const mappedKey = key === "_global" ? "_global" : String(key);
          // Append messages if multiple errors for same field
          if (backendErrors[mappedKey]) {
            backendErrors[mappedKey] += " \n" + (error.msg || "Invalid value");
          } else {
            backendErrors[mappedKey] = error.msg || "Invalid value";
          }
          console.log(`Field error: ${mappedKey} - ${error.msg}`); // Debug log
        });

        // Move any _global messages to apiError
        if (backendErrors._global) {
          setApiError(backendErrors._global);
          delete backendErrors._global;
        }

        setErrors(backendErrors);
        return;
      }

      // Handle server/database errors
      if (response.message || response.error) {
        const errorMessage =
          response.message || "Signup failed. Please try again.";
        console.log("API Error:", errorMessage); // Debug log
        setApiError(errorMessage);
        return;
      }

      // Handle success case
      if (response && response.userName) {
        console.log("Signup successful:", response);
        if (setModalChild) {
          setModalChild("login");
        }
        return;
      }

      // Unexpected response format
      setApiError("Unexpected response from server. Please try again.");
    } catch (error) {
      console.error("Signup error:", error); // Debug log
      setApiError("Network error or server unavailable. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full  md:px-8 px-4 md:py-6 py-4">
      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold text-indigo-600 tracking-wider mb-2">
          EMS
        </h2>
        <p className="text-md mb-3">Please sign up to continue</p>
        {apiError && (
          <div className="mt-2 p-2 bg-red-50 border-2 border-red-400 text-red-700 rounded-md font-medium text-sm">
            {apiError}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium">
            Your Name
          </label>
          <input
            id="firstName"
            name="userName"
            type="text"
            required
            value={formData.userName}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 md:py-3 py-2 border-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm ${
              errors.userName ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            placeholder="Enter your first name"
          />
          {errors.userName && (
            <p className="mt-1 text-sm font-medium text-red-600">
              ⚠️ {errors.userName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 md:py-3 py-2 border-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm ${
              errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium">
            Contact
          </label>
          <input
            id="contact"
            name="contact"
            type="tel"
            required
            value={formData.contact}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 md:py-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm ${
              errors.contact ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your contact number"
          />
          {errors.contact && (
            <p className="mt-1 text-xs text-red-500">{errors.contact}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 md:py-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        <div>
          <Button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md
            shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
             focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </Button>
        </div>
      </form>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <p className=" text-sm ">Already have an account?</p>
        </div>
        <button
          onClick={() => setModalChild("login")}
          className="border-0 outline-none text-sm font-medium text-indigo-600 hover-text-indigo-800 cursor-pointer"
        >
          Sign in!
        </button>
      </div>
    </div>
  );
};

export default SignUp;
