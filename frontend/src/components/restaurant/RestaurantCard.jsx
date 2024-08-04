import React from "react";
import "../../styles/card.css";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const getCuisineStyle = (cuisine) => {
    switch (cuisine) {
      case "Italian":
        return { backgroundColor: "#FDD1D2", color: "black" };
      case "Chinese":
        return { backgroundColor: "#87cefa", color: "black" };
      case "Indian":
        return { backgroundColor: "#98fb98", color: "black" };
      case "Mexican":
        return { backgroundColor: "#d3d3d3", color: "black" };
      case "Japanese":
        return { backgroundColor: "#ffe86b", color: "black" };
      default:
        return { backgroundColor: "#fff", color: "black" };
    }
  };

  return (
    <Link to={`/operations/restaurant/view/${restaurant._id}`} className="enq">
      <div className="title" style={{ marginLeft: "10px" }}>
        {restaurant?.name}
      </div>
      <div className="budget">{restaurant?.country}</div>
      <div className="status" style={getCuisineStyle(restaurant?.cuisine)}>
        {restaurant?.cuisine}
      </div>
    </Link>
  );
};

export default RestaurantCard;
