import React, { useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  return user?.user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
