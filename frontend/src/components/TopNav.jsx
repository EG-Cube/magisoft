import React from "react";
import "../styles//TopNav.css";

import leftImage from "../assets/magilogo.png";
import rightImage from "../assets/england.png";

const TopNav = () => {
  return (
    <div className="TopNav">
      <img src={leftImage} alt="Left Image" className="nav-image" />
      <img src={rightImage} alt="Right Image" className="nav-image" />
    </div>
  );
};

export default TopNav;
