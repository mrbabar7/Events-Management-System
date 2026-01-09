import { useState } from "react";
import { Link } from "react-router-dom";
import { postLogout } from "../services/authService";
import { useContext } from "react";
import { AuthStore } from "../authContextStore/AuthProvider";
import { ClockLoader } from "react-spinners";
import { User, Menu, X } from "lucide-react";
const Header = () => {
  const { setLoading } = useContext(AuthStore);
  const [modalLoading, setModalLoading] = useState(false);
  const [slideBar, setSlideBar] = useState(false);
  const handleLogout = async () => {
    setModalLoading(true);
    setTimeout(async () => {
      const responce = await postLogout();
      console.log("logout:", responce);
      if (responce) {
        setModalLoading(false);
        setLoading(true);
        return;
      }
    }, 2000);
  };

  return (
    <div>
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50 ">
        <h1 className="text-2xl font-bold text-indigo-600">MR.BABAR</h1>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link to="/features" className="text-gray-700 hover:text-indigo-600">
            Features
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-indigo-600">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-5">
          <Link
            to="/dashbord"
            className="bg-purple-100 hover:bg-indigo-100 p-2 rounded-full shadow-md"
          >
            <User className=" text-indigo-600" />
          </Link>
          <div className="hidden md:flex">
            {!modalLoading ? (
              <button
                className="bg-indigo-600 text-white px-5 py-2 cursor-pointer rounded-full hover:bg-indigo-700 transition-all"
                onClick={handleLogout}
              >
                Log out
              </button>
            ) : (
              <div className="bg-indigo-600 px-5 py-2  rounded-full">
                <ClockLoader size={20} color="white" />
              </div>
            )}
          </div>
          <div className="md:hidden flex">
            <button
              className="hover:bg-indigo-100  p-2 rounded-full cursor-pointer"
              onClick={() => setSlideBar(!slideBar)}
            >
              {!slideBar ? (
                <Menu color="#5a67d8" strokeWidth={3} />
              ) : (
                <X color="#5a67d8" strokeWidth={3} />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile slide-in menu (from right) */}
      <nav
        className={`z-50 md:hidden fixed top-18 right-0 h-full w-56 bg-white shadow-lg transform transition-transform duration-300 ${
          slideBar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 pt-6 flex flex-col space-y-3">
          <Link
            to="/"
            className="block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded"
            onClick={() => setSlideBar(!slideBar)}
          >
            Home
          </Link>
          <Link
            to="/features"
            className="block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded"
            onClick={() => setSlideBar(!slideBar)}
          >
            Features
          </Link>
          <Link
            to="/about"
            className="block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded"
            onClick={() => setSlideBar(!slideBar)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded"
            onClick={() => setSlideBar(!slideBar)}
          >
            Contact
          </Link>
          {!modalLoading ? (
            <button
              className="bg-indigo-600 text-white  text-center py-2 cursor-pointer w-full rounded-md hover:bg-indigo-700 transition-all"
              onClick={handleLogout}
            >
              Log out
            </button>
          ) : (
            <div className="bg-indigo-600 px-auto py-2  rounded-md w-full">
              <ClockLoader size={20} color="white" />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Header;
