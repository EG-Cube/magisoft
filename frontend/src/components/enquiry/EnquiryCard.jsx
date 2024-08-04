import React from "react";
import "../../styles/card.css";
import { Link } from "react-router-dom";

const EnquiryCard = ({ enquiry, isAdmin, redirectLink }) => {

  const formatDestinations = (destinations) => {
    if (!destinations || destinations.length === 0) return "";

    let joinedDestinations = destinations.join(", ");
    if (joinedDestinations.length > 12) {
      joinedDestinations = joinedDestinations.slice(0, 12) + "...";
    }
    return joinedDestinations;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { backgroundColor: "#FDD1D2", color: "black" };
      case "Verified":
        return { backgroundColor: "#98fb98", color: "black" };
      case "Archived":
        return { backgroundColor: "#d3d3d3", color: "black" };
      default:
        return { backgroundColor: "#fff", color: "black" };
    }
  };

  return (
    <Link to={`${redirectLink}${enquiry._id}`} className="enq">
      <div className="title" style={{ marginLeft: "10px" }}>
        {enquiry?.firstName} {enquiry?.lastName}
      </div>
      <div className="budget">₹{enquiry?.budget}</div>
      <div className="details">
        <span>A</span>
        {enquiry?.passengers?.adults}
        <span>C</span>
        {enquiry?.passengers?.children}
        <span>I</span>
        {enquiry?.passengers?.infants}
      </div>
      <div className="package">
        {formatDestinations(enquiry?.destinations)} ({enquiry?.numberOfDays}D | {enquiry?.numberOfNights}N)
      </div>
      <div className="status" style={getStatusStyle(enquiry?.status)}>
        {enquiry?.status}
      </div>
    </Link>
  );
};

export default EnquiryCard;
