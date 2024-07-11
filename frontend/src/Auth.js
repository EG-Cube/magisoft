import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import React from "react";

const Auth = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

    console.log(user.email, user.department, allowedRoles)

  return allowedRoles.find((role) => user.department.includes(role)) ? (
    <Outlet />
  ) : user?.name ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signup" state={{ from: location }} replace />
  );
};

export default Auth;