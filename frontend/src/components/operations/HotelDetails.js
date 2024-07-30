import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHotelContext } from "../../hooks/useHotelContext"; // Updated context hook
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState } from "react";
import "../../styles/details.css";

import editBtn from "../../assets/edit.png";
import deleteBtn from "../../assets/delete.png";

const HotelDetails = ({ hotel }) => {
  const { dispatch } = useHotelContext(); // Updated context hook
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleEdit = async () => {
    navigate(`/operations/hotel/edit/${hotel?._id}`); // Updated route
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/api/hotel/${hotel?._id}`, { // Updated endpoint
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        dispatch({ type: "DELETE_HOTEL", payload: response.data }); // Updated action type
        navigate(`/operations/hotel/list`); // Updated route
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const getStarRatingStyle = (rating) => {
    return { color: "#FFD700" }; // Gold color for star rating
  };

  return (
    <div className="hotel-details">
      <div className="hotel-header">
        <div className="status">
          <div className="actions">
            <button className="edit-btn" onClick={handleEdit}>
              <img src={editBtn} alt="Edit" />
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <img src={deleteBtn} alt="Delete" />
            </button>
          </div>
          <span style={getStarRatingStyle(hotel?.starRating)}>
            {`★`.repeat(hotel?.starRating)}
          </span>
        </div>
      </div>
      <div className="hotel-content">
        <div className="row">
          <div>
            <div>Name:</div>
            <div>{hotel?.name}</div>
          </div>
          <div>
            <div>Address:</div>
            <div>
              {hotel?.address}, {hotel?.city}, {hotel?.state}, {hotel?.country} -{" "}
              {hotel?.pincode}
            </div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Description:</div>
            <div>{hotel?.description}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Facilities:</div>
            <div>{hotel?.amenities?.join(", ")}</div> {/* Updated field */}
          </div>
          <div>
            <div>Available Room Types:</div>
            <div>{hotel?.availableRoomTypes?.join(", ")}</div>
          </div>
          <div>
            <div>Available Meal Plans:</div>
            <div>{hotel?.availableMealPlans?.join(", ")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
