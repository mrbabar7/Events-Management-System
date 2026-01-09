import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./components/HomePage.jsx";
import RegisterEvent from "./components/RegisterEvent.jsx";
import AllEvents from "./components/AllEvents.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Features from "./components/Features.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import AuthProvider from "./authContextStore/AuthProvider.jsx";
import EventDetails from "./components/EventsDetails.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./ScrollToTop.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage></HomePage>} />
            <Route path="register-event" element={<RegisterEvent />} />
            <Route path="events" element={<AllEvents />} />
            <Route path="event-details/:eventId" element={<EventDetails />} />
            <Route path="dashbord" element={<UserProfile />} />
            <Route path="features" element={<Features />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    <ToastContainer />
  </StrictMode>
);
