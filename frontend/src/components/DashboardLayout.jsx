import React from "react";
import TopNav from "./TopNav";
import SideNavbar from "./SideNavbar";
import CentreSection from "./CentreSection";
import RightSide from "./RightSide";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
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
