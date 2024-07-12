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

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { backgroundColor: "#fcd980", color: "black" };
      case "Ongoing":
        return { backgroundColor: "#87cefa", color: "black" };
      case "Completed":
        return { backgroundColor: "#98fb98", color: "black" };
      case "Archived":
        return { backgroundColor: "#d3d3d3", color: "black" };
      default:
        return { backgroundColor: "#fff", color: "black" };
    }
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
      <div className="status" style={getStatusStyle(enquiry?.status)}>
        {enquiry?.status}
      </div>
    </Link>
  );
};

export default EnquiryCard;
