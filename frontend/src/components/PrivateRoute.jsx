import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
