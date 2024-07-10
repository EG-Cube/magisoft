import React from "react";
import { Link } from "react-router-dom";
import "../styles/TopNav.css";

import leftImage from "../assets/magilogo.png";
import rightImage from "../assets/england.png";

const TopNav = () => {
  return (
    <div className="TopNav">
      <img src={leftImage} alt="Left Image" className="nav-image left" />
      <div className="right-container">
        <Link to="/enquiry/general" className="nav-button">
          New Enquiry
        </Link>
        <img src={rightImage} alt="Right Image" className="nav-image right" />
      </div>
    </div>
  );
};

export default TopNav;
