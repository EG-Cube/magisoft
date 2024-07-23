import React from "react";
import "../../styles/card.css";
import { Link } from "react-router-dom";

const SiteCard = ({ site }) => {
  const formatDestinations = (destinations) => {
    if (!destinations || destinations.length === 0) return "";

    let joinedDestinations = destinations?.join(", ");
    if (joinedDestinations.length > 12) {
      joinedDestinations = joinedDestinations.slice(0, 12) + "...";
    }
    return joinedDestinations;
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case "Tourist":
        return { backgroundColor: "#FDD1D2", color: "black" };
      case "Historical":
        return { backgroundColor: "#87cefa", color: "black" };
      case "Business":
        return { backgroundColor: "#98fb98", color: "black" };
      case "Recreational":
        return { backgroundColor: "#d3d3d3", color: "black" };
      case "Religious":
        return { backgroundColor: "#ffe86b", color: "black" };
      default:
        return { backgroundColor: "#fff", color: "black" };
    }
  };

  return (
    <Link to={`/operations/site/view/${site._id}`} className="enq">
      <div className="title" style={{ marginLeft: "10px" }}>
        {site?.name}
      </div>
      <div className="budget">{site?.country}</div>
      <div className="status" style={getTypeStyle(site?.type)}>
        {site?.type}
      </div>
    </Link>
  );
};

export default SiteCard;
