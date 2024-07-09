import React from "react";
import "../styles/Enquiry.css";
import { Link } from "react-router-dom";

const EnquiryCard = ({ enquiry }) => {

  const formatDestinations = (destinations) => {
    if (!destinations || destinations.length === 0) return "";

    let joinedDestinations = destinations.join(", ");
    if (joinedDestinations.length > 12) {
      joinedDestinations = joinedDestinations.slice(0, 12) + "...";
    }
    return joinedDestinations;
  };

  return (
    <Link to={`/enquiry/view/${enquiry._id}`} className="enq">
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
        {formatDestinations(enquiry?.destinations)} ({enquiry?.numberOfDays}D)
      </div>
      <div className="status">{enquiry?.status}</div>
    </Link>
  );
};

export default EnquiryCard;
