import { useState, useEffect, useContext } from "react";
import React from "react";
import AuthContext from "../context/auth/AuthContext";

export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const { loggedIn, success, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (loggedIn) {
      setIsLoggedIn(true);
      console.log("logged in from useAuthStatus");
    } else {
      setIsLoggedIn(false);
      console.log("not logged in from useAuthStatus");
    }
    setCheckingStatus(false);
  }, [loggedIn, success]);

  return { loggedIn, checkingStatus };
};
