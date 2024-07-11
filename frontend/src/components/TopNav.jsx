import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/TopNav.css";

import leftImage from "../assets/magilogo.png";
import { useAuthContext } from "../hooks/useAuthContext";

const TopNav = () => {
  const { user } = useAuthContext();
  const [countryFlag, setCountryFlag] = useState(null);

  useEffect(() => {
    if (user) {
      const flagUrl = `https://flagsapi.com/${user.user.country.toUpperCase()}/flat/64.png`;
      console.log(flagUrl);
      setCountryFlag(flagUrl);
    }
  }, [user]);

  return (
    <div className="TopNav">
      <img src={leftImage} alt="Left Image" className="nav-image left" />
      <div className="right-container">
        <Link to="/enquiry/create" className="nav-button">
          New Enquiry
        </Link>
        {countryFlag && <img src={countryFlag} alt={user?.user.country} className="nav-image right" />}
      </div>
    </div>
  );
};

export default TopNav;
