import React from "react";
import "../styles/Sidebar.css";
import userImage from "../assets/user.png";

const Sidebar = ({ userName }) => {
  return (
    <div className="Sidebar">
      <nav className="nav">
        <ul>
          <li>
            <a href="#">Dashboard</a>
          </li>
          <li>
            <a href="#">Pending</a>
          </li>
          <li>
            <a href="#">Ongoing</a>
          </li>
          <li>
            <a href="#">Completed</a>
          </li>
          <li>
            <a href="#">Packages</a>
          </li>
          <li>
            <a href="#">Archive</a>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        <div className="user">
          <div className="user-pic">
            <img src={userImage} alt={userName} />
          </div>
          <div className="user-name">
            <p>{userName}</p>
          </div>
        </div>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
