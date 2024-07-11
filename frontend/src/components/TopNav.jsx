import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/TopNav.css";

import leftImage from "../assets/magilogo.png";
import { useAuthContext } from "../hooks/useAuthContext";

const TopNav = () => {
  const { user } = useAuthContext();
  const [countryFlag, setCountryFlag] = useState(null);

  useEffect(() => {
    const fetchCountryFlag = async () => {
      if (user) {
        try {
          const flagModule = await import(`../assets/${user.user.country}.png`);
          setCountryFlag(flagModule.default);
        } catch (error) {
          console.error(`Failed to load flag for ${user.user.country}`, error);
          setCountryFlag(null);
        }
      }
    };

    fetchCountryFlag();
  }, [user]);

  return (
    <div className="TopNav">
      <img src={leftImage} alt="Left Image" className="nav-image left" />
      <div className="right-container">
        <Link to="/enquiry/general" className="nav-button">
          New Enquiry
        </Link>
        {countryFlag && <img src={countryFlag} alt={user?.user.country} className="nav-image right" />}
      </div>
    </div>
  );
};

export default TopNav;
