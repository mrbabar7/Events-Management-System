import { useContext, useState, useEffect } from "react";
import LandingPage from "./components/LandingPage.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";
import Loader from "./blocks/Loader.jsx";
import { PacmanLoader } from "react-spinners";
import { AuthStore } from "./authContextStore/AuthProvider.jsx";
function App() {
  const { loggedIn, loading } = useContext(AuthStore);
  return (
    <>
      {loading ? (
        <Loader>
          <PacmanLoader color="#4F46E5" size={20} />
        </Loader>
      ) : (
        <>
          {loggedIn ? (
            <div>
              <Header></Header>
              <Outlet></Outlet>
              <Footer></Footer>
            </div>
          ) : (
            <LandingPage></LandingPage>
          )}
        </>
      )}
    </>
  );
}

export default App;
