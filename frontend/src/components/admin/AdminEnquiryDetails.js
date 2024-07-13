import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEnquiryContext } from "../../hooks/useEnquiryContext";
import { format } from "date-fns";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState } from "react";
import "../../styles/EnquiryDetails.css";

import editBtn from "../../assets/edit.png";
import archiveBtn from "../../assets/archive.png";
import deleteBtn from "../../assets/delete.png";
import { useUserContext } from "../../hooks/useUserContext";

const AdminEnquiryDetails = ({ enquiry }) => {
  const { dispatch } = useEnquiryContext();
  const { user } = useAuthContext();
  const { users } = useUserContext();
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();
  const enteredUser = users?.filter((u) => u._id === enquiry.enteredBy)[0];
  const allocatedUser = users?.filter((u) => u._id === enquiry.allocatedTo)[0];

  const handleEdit = async () => {
    navigate(`/admin/enquiry/edit/${enquiry._id}`);
  };

  const handleArchive = async () => {
    if (!user) {
      return;
    }

    let newStatus;
    switch (enquiry.status) {
      case "Archived":
        newStatus = "Pending";
        break;
      default:
        newStatus = "Archived";
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

      navigate(`/admin/enquiry/dashboard`);
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

      navigate(`/admin/enquiry/dashboard`);
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

    navigate(`/admin/enquiry/dashboard`);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { backgroundColor: "#FDD1D2", color: "black" };
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
    <div className="enquiry-details">
      <div className="enquiry-header">
        <div className="created-date">
          {enquiry.createdAt &&
            formatDistanceToNow(new Date(enquiry.createdAt), {
              addSuffix: true,
            })}
        </div>

        <div className="status">
          {!isUpdated && enquiry.status !== "Archived" && (
            <button className="edit-status-btn" onClick={handleUpdateStatus}>
              Update to {enquiry.status === "Pending" ? "Ongoing" : ""}
              {enquiry.status === "Ongoing" ? "Completed" : ""}
              {enquiry.status === "Completed" ? "Reopened" : ""}
            </button>
          )}
          <div className="actions">
            <button className="edit-btn" onClick={handleEdit}>
              <img src={editBtn} alt="Edit" />
            </button>
            <button className="archive-btn" onClick={handleArchive}>
              <img src={archiveBtn} alt="Archive" />
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <img src={deleteBtn} alt="Delete" />
            </button>
          </div>
          <span style={getStatusStyle(enquiry.status)}>{enquiry.status}</span>
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
            <div>
              {enteredUser?.firstName} {enteredUser?.lastName}
            </div>
          </div>
          <div>
            <div>Allocated To:</div>
            <div>
              {allocatedUser?.firstName} {allocatedUser?.lastName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiryDetails;
