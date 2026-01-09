import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../blocks/Button";
import { postLogin } from "../services/authService";
import { AuthStore } from "../authContextStore/AuthProvider";
import { ClockLoader } from "react-spinners";
const Login = ({ setModalChild, setModalOpen }) => {
  const navigate = useNavigate("");
  const { setLoading } = useContext(AuthStore);
  const [modalLoading, setModalLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // show loader on button for exactly 2 seconds, then call API
    setApiError(null);
    setApiSuccess(null);
    setErrors({});
    setModalLoading(true);

    setTimeout(async () => {
      try {
        const response = await postLogin(formData);
        console.log("Server response:", response); // Debug log

        // Handle validation errors (array)
        if (response.errors && Array.isArray(response.errors)) {
          const backendErrors = {};
          const inferField = (msg) => {
            const m = (msg || "").toLowerCase();
            if (m.includes("email")) return "email";
            if (m.includes("password")) return "password";
            return "_global";
          };
          response.errors.forEach((error) => {
            const key = error.param || inferField(error.msg || "");
            const mappedKey = key === "_global" ? "_global" : String(key);
            if (backendErrors[mappedKey]) {
              backendErrors[mappedKey] +=
                " \n" + (error.msg || "Invalid value");
            } else {
              backendErrors[mappedKey] = error.msg || "Invalid value";
            }
          });
          if (backendErrors._global) {
            setApiError(backendErrors._global);
            delete backendErrors._global;
          }
          setErrors(backendErrors);
          return;
        }

        // Server/db errors
        if (response.message || response.error) {
          setApiError(response.message || response.error || "Login failed");
          return;
        }

        // Success: backend returns user info (assume email present)
        if (response && response.email) {
          setApiSuccess("Logged in successfully");
          setModalChild("");
          setModalOpen(false);
          setLoading(true);
          return;
        }

        setApiError("Unexpected response from server. Please try again.");
      } catch (error) {
        console.error("Login error:", error); // Debug log
        setApiError("Network error or server unavailable. Please try again.");
      } finally {
        setModalLoading(false);
      }
    }, 2000);
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
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-600 tracking-wider">
          EMS
        </h2>
        <p className="mt-2 text-md">Please sign in to continue</p>
        {apiError && (
          <div className="mt-2 p-2 bg-red-50 border-2 border-red-400 text-red-700 rounded-md font-medium text-sm">
            {apiError}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
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
            disabled={modalLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {modalLoading ? <ClockLoader size={20} color="white" /> : "Sign in"}
          </Button>
        </div>
      </form>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <p className=" text-sm ">Don't have an account?</p>
        </div>
        <button
          onClick={() => setModalChild("signup")}
          className="border-0 text-sm outline-none font-medium text-indigo-600 hover-text-indigo-800 cursor-pointer"
        >
          Sign up!
        </button>
      </div>
    </div>
  );
};

export default Login;
