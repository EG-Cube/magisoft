import React from "react";
import "../../styles/card.css";
import { Link } from "react-router-dom";

const TransportCard = ({ transport }) => {
  const getModeStyle = (mode) => {
    switch (mode) {
      case "Cab":
        return { backgroundColor: "#FDD1D2", color: "black" };
      case "Bus":
        return { backgroundColor: "#87cefa", color: "black" };
      case "Train":
        return { backgroundColor: "#98fb98", color: "black" };
      case "Flight":
        return { backgroundColor: "#d3d3d3", color: "black" };
      case "Ship":
        return { backgroundColor: "#ffe86b", color: "black" };
      default:
        return { backgroundColor: "#fff", color: "black" };
    }
  };

  return (
    <Link to={`/operations/transport/view/${transport._id}`} className="enq">
      <div className="title" style={{ marginLeft: "10px" }}>
        {transport?.company}
      </div>
      <div className="budget">{transport?.fromLocation} to {transport?.toLocation}</div>
      <div className="status" style={getModeStyle(transport?.modeOfTransport)}>
        {transport?.modeOfTransport}
      </div>
    </Link>
  );
};

export default TransportCard;
