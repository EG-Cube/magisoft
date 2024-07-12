import React, { useEffect } from "react";
import TopNav from "./TopNav";
import SideNavbar from "./SideNavbar";
import CentreSection from "./CentreSection";
import RightSide from "./RightSide";
import UnauthorizedPage from "./UnauthorizedPage"
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const DashboardLayout = ({ allowed }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  // useEffect(() => {console.log(user.user.department)}, [user])

  return (
    <>
      <TopNav />
      <div className="main-content">
        <SideNavbar />
        <CentreSection>
          {allowed.includes(user?.user.department) ? <Outlet /> : <UnauthorizedPage />}
          
        </CentreSection>
        <RightSide />
      </div>
    </>
  );
};

export default DashboardLayout;
