import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/TopNav.css";
import leftImage from "../../assets/magilogo.png";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getCode } from 'country-list';

const TopNav = () => {
  const { user } = useAuthContext();
  const [countryFlag, setCountryFlag] = useState(null);

  useEffect(() => {
    if (user) {
      const countryCode = getCode(user.user.country);
      if (countryCode) {
        const flagUrl = `https://flagsapi.com/${countryCode.toUpperCase()}/flat/64.png`;
        setCountryFlag(flagUrl);
      }
    }
  }, [user]);

  return (
    <div className="TopNav">
      <img src={leftImage} alt="Left" className="nav-image left" />
      <div className="right-container">
        <Link to="/operations/site/create" className="nav-button">
          New Site
        </Link>
        {countryFlag && <img src={countryFlag} alt={user?.user.country} className="nav-image right" />}
      </div>
    </div>
  );
};

export default TopNav;
