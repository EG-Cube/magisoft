import React from "react";
import "../../styles/card.css";
import { Link } from "react-router-dom";

const ItineraryCard = ({ itinerary }) => {
  const formatSites = (sites) => {
    if (!sites || sites.length === 0) return "No sites";

    let joinedSites = sites?.map((site) => site.name).join(", ");
    if (joinedSites.length > 50) {
      joinedSites = joinedSites.slice(0, 50) + "...";
    }
    return joinedSites;
  };

  return (
    <Link to={`/operations/itinerary/view/${itinerary._id}`} className="enq">
      <h3 className="title">{itinerary?.name}</h3>
      {/* <p className="description">{itinerary?.description}</p> */}
      <p className="days">{itinerary?.days.length} Days</p>
    </Link>
  );
};

export default ItineraryCard;
