import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import React from "react";

const Auth = ({ allowedDepartments }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return allowedDepartments.includes(user?.department) ? (
    <Outlet />
  ) : user?.name ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signup" state={{ from: location }} replace />
  );
};

export default Auth;
