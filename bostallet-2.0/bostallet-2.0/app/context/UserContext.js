"use client"; // Behövs eftersom Context hanterar state
import { createContext, useContext, useState, useEffect, use } from "react";
import { checkUserStatus } from "../functions/functions";
const UserContext = createContext();

// Provider-komponenten som omger appen
export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [hollidays, setHollidays] = useState([]);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const logedinUser = await checkUserStatus(); // Exempel på async-funktion
      if (logedinUser) {
        setUser(logedinUser.username);
        setAdmin(logedinUser.admin);
      } else {
        console.log("Du har inte behörighet.");
      }
    }
    checkUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        message,
        setMessage,
        user,
        setUser,
        error,
        setError,
        userData,
        setUserData,
        loading,
        setLoading,
        currentWeek,
        setCurrentWeek,
        currentYear,
        setCurrentYear,
        hollidays,
        setHollidays,
        admin,
        setAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook för att använda Context
export const useUserContext = () => useContext(UserContext);
