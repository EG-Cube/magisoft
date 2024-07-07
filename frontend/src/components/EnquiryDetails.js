import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEnquiryContext } from "../hooks/useEnquiryContext";
import { format } from "date-fns";
import axios from "axios";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState } from "react";

const EnquiryDetails = ({ enquiry }) => {
  const { dispatch } = useEnquiryContext();
  const { user } = useAuthContext();
  const [isUpdated, setIsUpdated] = useState(false)
  const navigate = useNavigate();

  const handleEdit = async () => {
    navigate(`/enquiry/edit/${enquiry._id}`);
  };

  const handleUpdateStatus = async () => {
    if (!user) {
      return;
    }

    let newStatus = "";
    if(enquiry.status == "Pending") {
      newStatus = "Ongoing"
    } else if (enquiry.status == "Ongoing" || enquiry.status == "Reopened"){
      newStatus = "Completed"
    } else if (enquiry.status == "Completed") {
      newStatus = "Reopened"
    }

    try {
      const response = await axios.patch(
        `/api/enquiry/${enquiry._id}`,
        {
          ...enquiry,
          status: newStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const updatedEnquiry = response.data;
      setIsUpdated(true);

      dispatch({ type: "UPDATE_ENQUIRY", payload: updatedEnquiry });

      navigate(`/enquiry/dashboard`);
    } catch (error) {
      console.error("Failed to update status of enquiry", error);
    }
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/enquiry/" + enquiry._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ENQUIRY", payload: json });
    }
  };

  return (
    <div className="enquiry-details">
      <h4>
        {enquiry.firstName} {enquiry.lastName}
      </h4>
      <p>
        <strong>Dates: </strong>
        {format(new Date(enquiry.fromDate), "MMMM do yyyy")} -{" "}
        {format(new Date(enquiry.toDate), "MMMM do yyyy")} (
        {enquiry.numberOfDays} days)
      </p>
      <p>
        <strong>Passengers: </strong>
        {enquiry.passengers.adults} Adults | {enquiry.passengers.children}{" "}
        Children | {enquiry.passengers.infants} Infants
      </p>
      <p>
        <strong>Destinations: </strong>
        {enquiry.destinations.join(", ")}
      </p>
      <p>
        <strong>From: </strong>
        {enquiry.fromLocation}
      </p>
      <p>
        <strong>To: </strong>
        {enquiry.toLocation}
      </p>
      <p>
        <strong>Budget: </strong>₹{enquiry.budget}
      </p>
      <p>
        <strong>Hotel Star Rating: </strong>
        {enquiry.hotelStarRating}
      </p>
      <p>
        <strong>Number of Rooms: </strong>
        {enquiry.numberOfRooms}
      </p>
      <p>
        <strong>Meal Plan: </strong>
        {enquiry.mealPlan}
      </p>
      <p>
        <strong>Room Comments: </strong>
        {enquiry.roomComments}
      </p>
      <p>
        <strong>Phone Number: </strong>
        {enquiry.phoneNumber}
      </p>
      <p>
        <strong>Email Address: </strong>
        {enquiry.emailAddress}
      </p>
      <p>
        <strong>Flight Booking Required: </strong>
        {enquiry.flightBookingRequired ? "Yes" : "No"}
      </p>
      <p>
        <strong>Purpose: </strong>
        {enquiry.purpose}
      </p>
      <p>
        <strong>Status: </strong>
        {enquiry.status}
      </p>
      <p>
        <strong>Remarks: </strong>
        {enquiry.remarks}
      </p>
      <p>
        <strong>Entered by: </strong>
        {enquiry.enteredBy}
      </p>
      <p>
        {formatDistanceToNow(new Date(enquiry.createdAt), { addSuffix: true })}
      </p>
      {!isUpdated && enquiry.status != "Archived" && (
        <button onClick={handleUpdateStatus}>
          <span>
            Update Status to{" "}
            {enquiry.status == "Pending" ? "Ongoing" : ""}
            {enquiry.status == "Ongoing" || enquiry.status == "Reopened" ? "Completed" : ""}  
            {enquiry.status == "Completed" ? "Reopened" : ""}               
          </span>
        </button>
      )}

      <button onClick={handleEdit}>
        <span className="material-symbols-outlined">edit</span>
      </button>
      <button onClick={handleDelete}>
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
};

export default EnquiryDetails;
