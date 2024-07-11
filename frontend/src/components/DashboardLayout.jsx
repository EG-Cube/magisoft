import React from "react";
import TopNav from "./TopNav";
import SideNavbar from "./SideNavbar";
import CentreSection from "./CentreSection";
import RightSide from "./RightSide";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <TopNav />
      <div className="main-content">
        <SideNavbar />
        <CentreSection>{children}</CentreSection>
        <RightSide />
      </div>
    </>
  );
};

export default DashboardLayout;
