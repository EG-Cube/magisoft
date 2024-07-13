import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUserContext } from "../../hooks/useUserContext";
import { format } from "date-fns";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState } from "react";
import "../../styles/UserDetails.css";

const UserDetails = ({ user }) => {
  const { dispatch } = useUserContext();
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  const handleEdit = async () => {
    navigate(`/user/edit/${user._id}`);
  };

  const handleArchive = async () => {
    if (!user) {
      return;
    }

    let newStatus;
    if (user.status === "Archived") newStatus = "Pending";
    else newStatus = "Archived"

    try {
      const response = await axios.patch(
        `/api/user/${user._id}`,
        {
          ...user,
          status: newStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const updatedUser = response.data;
      setIsUpdated(true);

      dispatch({ type: "UPDATE_ENQUIRY", payload: updatedUser });

      navigate(`/user/dashboard`);
    } catch (error) {
      console.error("Failed to update status of user", error);
    }
  };

  const handleUpdateStatus = async () => {
    if (!user) {
      return;
    }

    let newStatus = "";
    if (user.status === "Pending") {
      newStatus = "Ongoing";
    } else if (user.status === "Ongoing") {
      newStatus = "Completed";
    } else if (user.status === "Completed") {
      newStatus = "Pending";
    }

    try {
      const response = await axios.patch(
        `/api/user/${user._id}`,
        {
          ...user,
          status: newStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const updatedUser = response.data;
      setIsUpdated(true);

      dispatch({ type: "UPDATE_ENQUIRY", payload: updatedUser });

      navigate(`/user/dashboard`);
    } catch (error) {
      console.error("Failed to update status of user", error);
    }
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/user/" + user._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ENQUIRY", payload: json });
    }

    navigate(`/user/dashboard`);
  };

  return (
    <div className="user-details">
      <div className="user-header">
        <div className="created-date">
          {user.createdAt &&
            formatDistanceToNow(new Date(user.createdAt), {
              addSuffix: true,
            })}
        </div>
        <div className="status">
          <div className="actions">
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
            {!isUpdated && user.status !== "Archived" && (
              <button className="edit-status-btn" onClick={handleUpdateStatus}>
                Update Status to {user.status === "Pending" ? "Ongoing" : ""}
                {user.status === "Ongoing" ? "Completed" : ""}
                {user.status === "Completed" ? "Reopened" : ""}
              </button>
            )}
            <button className="edit-status-btn" onClick={handleArchive}>
              {user.status === "Archived" ? "Unarchive" : "Archive"}
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <span>{user.status}</span>
        </div>
      </div>
      <div className="user-content">
        <div className="row">
          <div>
            <div>Name:</div>
            <div>
              {user.firstName} {user.lastName}
            </div>
          </div>
          <div>
            <div>Budget:</div>
            <div>₹{user.budget}</div>
          </div>
          <div>
            <div>Destination:</div>
            <div>{user.destinations.join(", ")}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Purpose:</div>
            <div>{user.purpose}</div>
          </div>
          <div>
            <div>Email:</div>
            <div>{user.emailAddress}</div>
          </div>
          <div>
            <div>Phone Number:</div>
            <div>{user.phoneNumber}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>From:</div>
            <div>{user.fromLocation}</div>
          </div>
          <div>
            <div>To:</div>
            <div>{user.toLocation}</div>
          </div>
          <div className="passengers">
            <div>
              <div>Adults:</div>
              <div>{user.passengers.adults}</div>
            </div>
            <div>
              <div>Children:</div>
              <div>{user.passengers.children}</div>
            </div>
            <div>
              <div>Infants:</div>
              <div>{user.passengers.infants}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>From Date:</div>
            <div>{format(new Date(user.fromDate), "MMMM do yyyy")}</div>
          </div>
          <div>
            <div>To Date:</div>
            <div>{format(new Date(user.toDate), "MMMM do yyyy")}</div>
          </div>
          <div>
            <div>Number of Days:</div>
            <div>{user.numberOfDays}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Number of Rooms:</div>
            <div>{user.numberOfRooms}</div>
          </div>
          <div>
            <div>Hotel Star Rating:</div>
            <div>{user.hotelStarRating}</div>
          </div>
          <div>
            <div>Meal Plan:</div>
            <div>{user.mealPlan}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Room Comments:</div>
            <div>{user.roomComments}</div>
          </div>
          <div>
            <div>Flight Booking Required:</div>
            <div>{user.flightBookingRequired ? "Yes" : "No"}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Remarks:</div>
            <div>{user.remarks}</div>
          </div>
          <div>
            <div>Entered By:</div>
            <div>{user.enteredBy}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
