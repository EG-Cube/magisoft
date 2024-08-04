import React from "react";
import "../../styles/card.css";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const formatRoomTypes = (roomTypes) => {
    if (!roomTypes || roomTypes.length === 0) return "";

    let joinedRoomTypes = roomTypes?.join(", ");
    if (joinedRoomTypes.length > 12) {
      joinedRoomTypes = joinedRoomTypes.slice(0, 12) + "...";
    }
    return joinedRoomTypes;
  };

  const getStarRatingStyle = (rating) => {
    const starColors = ["#FFDDC1", "#FFDDC1", "#FFDDC1", "#FFDDC1", "#FFDDC1"];
    for (let i = 0; i < rating; i++) {
      starColors[i] = "#FFD700"; // gold color for star rating
    }
    return { color: starColors.join(",") };
  };

  return (
    <Link to={`/operations/hotel/view/${hotel._id}`} className="enq">
      <div className="title" style={{ marginLeft: "10px" }}>
        {hotel?.name}
      </div>
      <div className="budget">{hotel?.country}</div>
      <div className="rating" style={getStarRatingStyle(hotel?.starRating)}>
        {`★`.repeat(hotel?.starRating)}
      </div>
      <div className="roomTypes">
        {formatRoomTypes(hotel?.availableRoomTypes)}
      </div>
    </Link>
  );
};

export default HotelCard;
