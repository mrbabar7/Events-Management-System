import { createContext, useState, useEffect } from "react";
import { checkUser } from "../services/authService";
export const AuthStore = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
  loading: true,
  setLoading: () => {},
});
const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const sessionCheck = async () => {
      const checkLogged = await checkUser();
      console.log("show status :", checkLogged.isLogged);
      setLoggedIn(checkLogged.isLogged);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    sessionCheck();
  }, [loading]);
  return (
    <AuthStore.Provider value={{ loading, loggedIn, setLoggedIn, setLoading }}>
      {children}
    </AuthStore.Provider>
  );
};
export default AuthProvider;
