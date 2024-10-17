import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/TopNav.css";
import leftImage from "../../assets/magilogo.png";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getCode } from "country-list";

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
        {user?.user?.roles?.find((role) => role === "Admin") && (
          <Link to="/admin/user/dashboard" className="nav-button">
            Admin
          </Link>
        )}
        {user?.user?.roles?.find(
          (role) => role === "Sales" || role === "Admin"
        ) && (
          <Link to="/sales/dashboard" className="nav-button">
            Sales
          </Link>
        )}
        {user?.user?.roles?.find(
          (role) => role === "Accounting" || role === "Admin"
        ) && (
          <Link to="/accounting/dashboard" className="nav-button">
            Accounting
          </Link>
        )}
        <Link to="/accounting/site/create" className="nav-button">
          New Site
        </Link>
        {countryFlag && (
          <img
            src={countryFlag}
            alt={user?.user.country}
            className="nav-image right"
          />
        )}
      </div>
    </div>
  );
};

export default TopNav;
