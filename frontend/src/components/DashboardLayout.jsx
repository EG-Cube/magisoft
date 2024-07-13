import React, { useEffect } from "react";
import TopNav from "./TopNav";
import SideNavbar from "./SideNavbar";
import CentreSection from "./CentreSection";
import RightSide from "./RightSide";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const DashboardLayout = ({ allowed }) => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const location = useLocation();

  useEffect(() => {
    if (user && !allowed.includes(user?.user.department)) {
      logout();
    }
  }, [user, allowed, logout]);

  if (!allowed.includes(user?.user.department)) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return (
    <>
      <TopNav />
      <div className="main-content">
        <SideNavbar />
        <CentreSection>
          <Outlet />
        </CentreSection>
        <RightSide />
      </div>
    </>
  );
};

export default DashboardLayout;
