import React, { useState, useEffect, useContext } from "react";
//context
import AuthContext from "../context/auth/AuthContext";

export const useAuthStatus = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { loggedIn, success, dispatch } = useContext(AuthContext);

  useEffect(() => {
    //checking AuthContext loggedIn variable, if true set isLoggedIn to true
    if (loggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    //all the logic is done so setCheckingStatus to false
    setCheckingStatus(false);
  }, [loggedIn, success]);

  return { loggedIn, checkingStatus };
};
