import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUserContext } from "../../hooks/useUserContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useEffect, useState } from "react";
import "../../styles/details.css";

import editBtn from "../../assets/edit.png";
import deleteBtn from "../../assets/delete.png";

const UserDetails = ({ user }) => {
  const { user: admin } = useAuthContext();
  const { dispatch } = useUserContext();
  const navigate = useNavigate();
  
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleEdit = async () => {
    navigate(`/admin/user/edit/${user?._id}`);
  };

  const handleDelete = async () => {
    if (!admin) {
      return;
    }

    const response = await fetch(`${API_URL}/api/user/` + user?._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ENQUIRY", payload: json });
    }

    navigate(`/admin/user/dashboard`);
  };

  return (
    <div className="user-details">
      <div className="user-header">
        <div className="created-date">
          {user?.createdAt &&
            formatDistanceToNow(new Date(user?.createdAt), {
              addSuffix: true,
            })}
        </div>

        <div className="status">
          <div className="actions">
            <button className="edit-btn" onClick={handleEdit}>
              <img src={editBtn} alt="Edit" />
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <img src={deleteBtn} alt="Delete" />
            </button>
          </div>
        </div>
      </div>
      <div className="user-content">
        <div className="row">
          <div>
            <div>Name:</div>
            <div>
              {user?.firstName} {user?.lastName}
            </div>
          </div>
          <div>
            <div>Roles:</div>
            <div>{user?.roles.join(", ")}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Email:</div>
            <div>{user?.email}</div>
          </div>
          <div>
            <div>Country:</div>
            <div>{user?.country}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
