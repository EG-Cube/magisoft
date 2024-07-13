import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEnquiryContext } from "../../hooks/useEnquiryContext";
import { format } from "date-fns";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState } from "react";
import "../../styles/EnquiryDetails.css";

const EnquiryDetails = ({ enquiry }) => {
  const { dispatch } = useEnquiryContext();
  const { user } = useAuthContext();
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  const handleEdit = async () => {
    navigate(`/enquiry/edit/${enquiry._id}`);
  };

  const handleArchive = async () => {
    if (!user) {
      return;
    }

    let newStatus;
    if (enquiry.status === "Archived") newStatus = "Pending";
    else newStatus = "Archived"

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

  const handleUpdateStatus = async () => {
    if (!user) {
      return;
    }

    let newStatus = "";
    if (enquiry.status === "Pending") {
      newStatus = "Ongoing";
    } else if (enquiry.status === "Ongoing") {
      newStatus = "Completed";
    } else if (enquiry.status === "Completed") {
      newStatus = "Pending";
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

    navigate(`/enquiry/dashboard`);
  };

  return (
    <div className="enquiry-details">
      <div className="enquiry-header">
        <div className="created-date">
          {enquiry.createdAt &&
            formatDistanceToNow(new Date(enquiry.createdAt), {
              addSuffix: true,
            })}
        </div>
        <div className="status">
          <div className="actions">
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
            {!isUpdated && enquiry.status !== "Archived" && (
              <button className="edit-status-btn" onClick={handleUpdateStatus}>
                Update Status to {enquiry.status === "Pending" ? "Ongoing" : ""}
                {enquiry.status === "Ongoing" ? "Completed" : ""}
                {enquiry.status === "Completed" ? "Reopened" : ""}
              </button>
            )}
            <button className="edit-status-btn" onClick={handleArchive}>
              {enquiry.status === "Archived" ? "Unarchive" : "Archive"}
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <span>{enquiry.status}</span>
        </div>
      </div>
      <div className="enquiry-content">
        <div className="row">
          <div>
            <div>Name:</div>
            <div>
              {enquiry.firstName} {enquiry.lastName}
            </div>
          </div>
          <div>
            <div>Budget:</div>
            <div>₹{enquiry.budget}</div>
          </div>
          <div>
            <div>Destination:</div>
            <div>{enquiry.destinations.join(", ")}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Purpose:</div>
            <div>{enquiry.purpose}</div>
          </div>
          <div>
            <div>Email:</div>
            <div>{enquiry.emailAddress}</div>
          </div>
          <div>
            <div>Phone Number:</div>
            <div>{enquiry.phoneNumber}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>From:</div>
            <div>{enquiry.fromLocation}</div>
          </div>
          <div>
            <div>To:</div>
            <div>{enquiry.toLocation}</div>
          </div>
          <div className="passengers">
            <div>
              <div>Adults:</div>
              <div>{enquiry.passengers.adults}</div>
            </div>
            <div>
              <div>Children:</div>
              <div>{enquiry.passengers.children}</div>
            </div>
            <div>
              <div>Infants:</div>
              <div>{enquiry.passengers.infants}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>From Date:</div>
            <div>{format(new Date(enquiry.fromDate), "MMMM do yyyy")}</div>
          </div>
          <div>
            <div>To Date:</div>
            <div>{format(new Date(enquiry.toDate), "MMMM do yyyy")}</div>
          </div>
          <div>
            <div>Number of Days:</div>
            <div>{enquiry.numberOfDays}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Number of Rooms:</div>
            <div>{enquiry.numberOfRooms}</div>
          </div>
          <div>
            <div>Hotel Star Rating:</div>
            <div>{enquiry.hotelStarRating}</div>
          </div>
          <div>
            <div>Meal Plan:</div>
            <div>{enquiry.mealPlan}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Room Comments:</div>
            <div>{enquiry.roomComments}</div>
          </div>
          <div>
            <div>Flight Booking Required:</div>
            <div>{enquiry.flightBookingRequired ? "Yes" : "No"}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Remarks:</div>
            <div>{enquiry.remarks}</div>
          </div>
          <div>
            <div>Entered By:</div>
            <div>{enquiry.enteredBy}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryDetails;
