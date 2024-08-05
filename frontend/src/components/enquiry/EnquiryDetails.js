import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEnquiryContext } from "../../hooks/useEnquiryContext";
import { useUserContext } from "../../hooks/useUserContext";
import { format } from "date-fns";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useEffect, useState } from "react";
import "../../styles/details.css";

import editBtn from "../../assets/edit.png";
import archiveBtn from "../../assets/archive.png";
import deleteBtn from "../../assets/delete.png";

const EnquiryDetails = ({ enquiry, isAdmin, type }) => {
  const { dispatch } = useEnquiryContext();
  const { user } = useAuthContext();
  const { users, dispatch: userDispatch } = useUserContext();
  const [isUpdated, setIsUpdated] = useState(false);
  const [isAllocatingSales, setIsAllocatingSales] = useState(false);
  const [isAllocatingOperations, setIsAllocatingOperations] = useState(false);
  const [isAllocatingAccounting, setIsAllocatingAccounting] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const enteredUser = users?.find((u) => u._id === enquiry.enteredBy);
  const salesAllocatedUser = users?.find((u) => u._id === enquiry.salesTo);
  const operationsAllocatedUser = users?.find(
    (u) => u._id === enquiry.operationsTo
  );
  const accountingAllocatedUser = users?.find(
    (u) => u._id === enquiry.accountingTo
  );

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${API_URL}/api/user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        userDispatch({ type: "SET_USERS", payload: json });
      }
    };

    fetchUsers();
  }, [API_URL, user.token, userDispatch]);

  const handleEdit = () => {
    const path = isAdmin
      ? `/admin/enquiry/edit/${enquiry._id}`
      : `/sales/enquiry/edit/${enquiry._id}`;
    navigate(path);
  };

  const handleArchive = async () => {
    if (!user) return;

    let newStatus = enquiry.status === "Archived" ? "Pending" : "Archived";

    try {
      const response = await axios.patch(
        `${API_URL}/api/enquiry/${enquiry._id}`,
        { ...enquiry, status: newStatus },
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
      navigate(isAdmin ? `/admin/enquiry/dashboard/` : `/sales/dashboard/`);
    } catch (error) {
      console.error("Failed to update status of enquiry", error);
    }
  };

  const handleUpdateStatus = async () => {
    if (!user) return;

    let newStatus = enquiry.status === "Pending" ? "Verified" : "";

    try {
      const response = await axios.patch(
        `${API_URL}/api/enquiry/${enquiry._id}`,
        { ...enquiry, status: newStatus },
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
      navigate(isAdmin ? `/admin/enquiry/dashboard` : `/sales/dashboard`);
    } catch (error) {
      console.error("Failed to update status of enquiry", error);
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    const response = await fetch(`${API_URL}/api/enquiry/${enquiry._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      dispatch({ type: "DELETE_ENQUIRY", payload: await response.json() });
      navigate(isAdmin ? `/admin/enquiry/dashboard` : `/sales/dashboard`);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { backgroundColor: "#FDD1D2", color: "black" };
      case "Verified":
        return { backgroundColor: "#98fb98", color: "black" };
      case "Archived":
        return { backgroundColor: "#d3d3d3", color: "black" };
      default:
        return { backgroundColor: "#fff", color: "black" };
    }
  };

  const handleAllocate = async (e, role) => {
    const selectedUserId = e.target.value;
    const roleField = `${role}To`;

    setIsLoading(true);

    try {
      const response = await axios.patch(
        `${API_URL}/api/enquiry/${enquiry._id}`,
        { ...enquiry, [roleField]: selectedUserId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const updatedEnquiry = response.data;
      switch (role) {
        case "sales":
          setIsAllocatingSales(false);
          break;
        case "operations":
          setIsAllocatingOperations(false);
          break;
        case "accounting":
          setIsAllocatingAccounting(false);
          break;
        default:
          break;
      }
      dispatch({ type: "UPDATE_ENQUIRY", payload: updatedEnquiry });
      navigate("/admin/enquiry/dashboard/");
    } catch (error) {
      console.error(`Failed to allocate ${role}`, error);
    }
  };

  const getFilteredUsers = (role) => {
    return users?.filter((user) =>
      user.roles.find((r) => r === role || r === "Admin")
    );
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
          {!isUpdated &&
            enquiry.status !== "Archived" &&
            enquiry.status !== "Verified" && (
              <button className="edit-status-btn" onClick={handleUpdateStatus}>
                {enquiry.status === "Pending" ? "Verify" : ""}
              </button>
            )}
          <div className="actions">
            {(type == "Sales" || isAdmin) && (
              <>
                <button className="edit-btn" onClick={handleEdit}>
                  <img src={editBtn} alt="Edit" />
                </button>
                <button className="archive-btn" onClick={handleArchive}>
                  <img src={archiveBtn} alt="Archive" />
                </button>
                {isAdmin && (
                  <button className="delete-btn" onClick={handleDelete}>
                    <img src={deleteBtn} alt="Delete" />
                  </button>
                )}
              </>
            )}

            {(type == "Operations" || isAdmin) && (
              <>
                <Link
                  to={`/operations/itinerary/create/${enquiry._id}`}
                  className="action-btn"
                >
                  Create Itinerary
                </Link>
                {isAdmin && (
                  <button className="delete-btn" onClick={handleDelete}>
                    <img src={deleteBtn} alt="Delete" />
                  </button>
                )}
              </>
            )}
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
        </div>
        <div className="row">
          <div>
            <div>Number of Days:</div>
            <div>{enquiry.numberOfDays}</div>
          </div>
          <div>
            <div>Number of Nights:</div>
            <div>{enquiry.numberOfNights}</div>
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
          {isAdmin && (
            <>
              <div>
                <div>Entered By:</div>
                <div>
                  {enteredUser?.firstName} {enteredUser?.lastName}
                </div>
              </div>
            </>
          )}
        </div>

        {isAdmin && (
          <div className="row">
            <div>
              <div>
                Sales Allocated To:
                {!isAllocatingSales && (
                  <button
                    className="allocate-btn"
                    onClick={() => setIsAllocatingSales(true)}
                  >
                    <img src={editBtn} alt="Edit" />
                  </button>
                )}
              </div>
              <div>
                {isAllocatingSales ? (
                  <>
                    <select
                      name="allocatedSalesTo"
                      onChange={(e) => handleAllocate(e, "sales")}
                      value={enquiry.salesTo || ""}
                    >
                      <option value="">Select User</option>
                      {getFilteredUsers("Sales").map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.firstName} {option.lastName}
                        </option>
                      ))}
                    </select>
                    <button
                      className="allocate-btn"
                      onClick={() => setIsAllocatingSales(false)}
                    >
                      <img src={editBtn} alt="Edit" />
                    </button>
                  </>
                ) : (
                  <>
                    {salesAllocatedUser?.firstName}{" "}
                    {salesAllocatedUser?.lastName}
                  </>
                )}
              </div>
            </div>
            <div>
              <div>
                Operations Allocated To:
                {!isAllocatingOperations && (
                  <button
                    className="allocate-btn"
                    onClick={() => setIsAllocatingOperations(true)}
                  >
                    <img src={editBtn} alt="Edit" />
                  </button>
                )}
              </div>
              <div>
                {isAllocatingOperations ? (
                  <>
                    <select
                      name="allocatedOperationsTo"
                      onChange={(e) => handleAllocate(e, "operations")}
                      value={enquiry.operationsTo || ""}
                    >
                      <option value="">Select User</option>
                      {getFilteredUsers("Operations").map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.firstName} {option.lastName}
                        </option>
                      ))}
                    </select>
                    <button
                      className="allocate-btn"
                      onClick={() => setIsAllocatingOperations(false)}
                    >
                      <img src={editBtn} alt="Edit" />
                    </button>
                  </>
                ) : (
                  <>
                    {operationsAllocatedUser?.firstName}{" "}
                    {operationsAllocatedUser?.lastName}
                  </>
                )}
              </div>
            </div>
            <div>
              <div>
                Accounting Allocated To:
                {!isAllocatingAccounting && (
                  <button
                    className="allocate-btn"
                    onClick={() => setIsAllocatingAccounting(true)}
                  >
                    <img src={editBtn} alt="Edit" />
                  </button>
                )}
              </div>
              <div>
                {isAllocatingAccounting ? (
                  <>
                    <select
                      name="allocatedAccountingTo"
                      onChange={(e) => handleAllocate(e, "accounting")}
                      value={enquiry.accountingTo || ""}
                    >
                      <option value="">Select User</option>
                      {getFilteredUsers("Accounting").map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.firstName} {option.lastName}
                        </option>
                      ))}
                    </select>
                    <button
                      className="allocate-btn"
                      onClick={() => setIsAllocatingAccounting(false)}
                    >
                      <img src={editBtn} alt="Edit" />
                    </button>
                  </>
                ) : (
                  <>
                    {accountingAllocatedUser?.firstName}{" "}
                    {accountingAllocatedUser?.lastName}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryDetails;
