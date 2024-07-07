import { useAuthContext } from "../hooks/useAuthContext";
import { EnquiryContext } from "../context/EnquiryContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const EnquiryCard = ({ enquiry }) => {
  const { dispatch } = useContext(EnquiryContext);
  const { user } = useAuthContext();

  const handleArchive = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await axios.patch(
        `/api/enquiry/${enquiry._id}`,
        {
          ...enquiry,
          status: enquiry.status == "Archived" ? "Pending" : "Archived",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const updatedEnquiry = response.data;

      dispatch({ type: "UPDATE_ENQUIRY", payload: updatedEnquiry });
    } catch (error) {
      console.error("Failed to archive enquiry", error);
    }
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await axios.delete(`/api/enquiry/${enquiry._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        dispatch({ type: "DELETE_ENQUIRY", payload: enquiry });
      }
    } catch (error) {
      console.error("Failed to delete enquiry", error);
    }
  };

  return (
    <div className="enquiry-card">
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
        {formatDistanceToNow(new Date(enquiry.createdAt), { addSuffix: true })}
      </p>
      <div className="btn-row">
        {enquiry.status}
        <span className="material-symbols-outlined" onClick={handleArchive}>
          archive
        </span>
        <Link to={`/enquiry/view/${enquiry._id}`}>
          <span className="material-symbols-outlined">info</span>
        </Link>
        <span className="material-symbols-outlined" onClick={handleDelete}>
          delete
        </span>
      </div>
    </div>
  );
};

export default EnquiryCard;
