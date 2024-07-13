import React from "react";
import "../../styles/User.css";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {

  const formatDestinations = (destinations) => {
    if (!destinations || destinations.length === 0) return "";

    let joinedDestinations = destinations.join(", ");
    if (joinedDestinations.length > 12) {
      joinedDestinations = joinedDestinations.slice(0, 12) + "...";
    }
    return joinedDestinations;
  };

  return (
    <Link to={`/user/view/${user._id}`} className="enq">
      <div className="title" style={{ marginLeft: "10px" }}>
        {user?.firstName} {user?.lastName}
      </div>
      <div className="budget">₹{user?.budget}</div>
      <div className="details">
        <span>A</span>
        {user?.passengers?.adults}
        <span>C</span>
        {user?.passengers?.children}
        <span>I</span>
        {user?.passengers?.infants}
      </div>
      <div className="package">
        {formatDestinations(user?.destinations)} ({user?.numberOfDays}D)
      </div>
      <div className="status">{user?.status}</div>
    </Link>
  );
};

export default UserCard;
