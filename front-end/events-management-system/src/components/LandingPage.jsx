import { useState } from "react";
import Professional from "../blocks/Professional.jsx";
import Button from "../blocks/Button.jsx";
import Modal from "../blocks/modal.jsx";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
// import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  //   const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalChild, setModalChild] = useState("");
  return (
    <div className="bg-blue-200 min-h-screen">
      <Professional
        className={`flex items-center justify-center h-screen py-[5%]`}
      >
        <div
          className="bg-white rounded-2xl md:px-10 px-6 py-4 shadow-lg shadow-indigo-600 flex flex-col md:flex-row
         items-center gap-6 h-full overflow-clip"
        >
          <div className="flex-1 text-center md:text-left">
            <h2 className="md:text-4xl lg:text-5xl text-3xl font-extrabold text-gray-900 leading-tight">
              Welcome to
              <br />
              <span className="text-indigo-600 md:hidden flex justify-center text-center tracking-wider">
                {" "}
                EMS
              </span>
              <span className="text-indigo-600 hidden md:flex">
                {" "}
                Event Management System
              </span>
            </h2>
            <p className="mt-4 text-gray-700 text-lg md:text-xl">
              Organize, discover, and register for events effortlessly. Create
              memorable experiences and manage attendees with confidence.
            </p>

            <div className="md:mt-8 mt-6 flex flex-col sm:flex-row md:gap-6  gap-4 items-center justify-center md:justify-start">
              <Button
                className={"text-white hover:bg-indigo-700 w-full text-md"}
                onClick={() => {
                  setModalOpen(true);
                  setModalChild("signup");
                }}
              >
                Sign up
              </Button>

              <Button
                onClick={() => {
                  setModalOpen(true);
                  setModalChild("login");
                }}
                className={`bg-white w-full hover:bg-gray-100  text-indigo-700 text-md  border border-indigo-600`}
              >
                Log In
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <img
              src="../src/assets/ems-blur.png"
              alt="EMS"
              className="w-full"
            />
          </div>
        </div>
        {modalOpen && (
          <Modal
            onClose={() => {
              setModalOpen(false);
              setModalChild("");
            }}
          >
            {modalChild === "login" && (
              <Login
                setModalChild={setModalChild}
                setModalOpen={setModalOpen}
              ></Login>
            )}
            {modalChild === "signup" && (
              <SignUp
                setModalChild={setModalChild}
                setModalOpen={setModalOpen}
              ></SignUp>
            )}
          </Modal>
        )}
      </Professional>
    </div>
  );
};

export default LandingPage;
