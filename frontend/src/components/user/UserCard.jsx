import React from "react";
import "../../styles/card.css";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {

  const formatRoles = (roles) => {
    if (!roles || roles.length === 0) return "";

    let joinedRoles = roles.join(", ");
    if (joinedRoles.length > 12) {
      joinedRoles = joinedRoles.slice(0, 12) + "...";
    }
    return joinedRoles;
  };

  return (
    <Link to={`/admin/user/view/${user._id}`} className="enq">
      <div className="title" style={{ marginLeft: "10px" }}>
        {user?.firstName} {user?.lastName}
      </div>
      {/* <div className="budget">₹{user?.budget}</div> */}
      {/* <div className="details">
        <span>A</span>
        {user?.passengers?.adults}
        <span>C</span>
        {user?.passengers?.children}
        <span>I</span>
        {user?.passengers?.infants}
      </div> */}
      <div className="package">
        {formatRoles(user?.roles)}
      </div>
    </Link>
  );
};

export default UserCard;
