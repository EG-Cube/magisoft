import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSiteContext } from "../../hooks/useSiteContext";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState } from "react";
import "../../styles/details.css";

import editBtn from "../../assets/edit.png";
import deleteBtn from "../../assets/delete.png";

const SiteDetails = ({ site }) => {
  const { dispatch } = useSiteContext();
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleEdit = async () => {
    navigate(`/operations/site/edit/${site?._id}`);
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`${API_URL}/api/site/` + site?._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_SITE", payload: json });
    }

    navigate(`/operations/site/list`);
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case "Tourist":
        return { backgroundColor: "#FDD1D2", color: "black" };
      case "Historical":
        return { backgroundColor: "#87cefa", color: "black" };
      case "Business":
        return { backgroundColor: "#98fb98", color: "black" };
      case "Recreational":
        return { backgroundColor: "#d3d3d3", color: "black" };
      case "Religious":
        return { backgroundColor: "#ffe86b", color: "black" };
      default:
        return { backgroundColor: "#fff", color: "black" };
    }
  };

  return (
    <div className="site-details">
      <div className="site-header">
        <div className="status">
          <div className="actions">
            <button className="edit-btn" onClick={handleEdit}>
              <img src={editBtn} alt="Edit" />
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <img src={deleteBtn} alt="Delete" />
            </button>
          </div>
          <span style={getTypeStyle(site?.type)}>{site?.type}</span>
        </div>
      </div>
      <div className="site-content">
        <div className="row">
          <div>
            <div>Name:</div>
            <div>{site?.name}</div>
          </div>
          <div>
            <div>Address:</div>
            <div>
              {site?.address}, {site?.city}, {site?.state}, {site?.country} -{" "}
              {site?.pincode}
            </div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Description:</div>
            <div>{site?.description}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Facilities:</div>
            <div>{site?.facilities?.join(", ")}</div>
          </div>
          <div>
            <div>Visiting Hours:</div>
            <div>
              {site?.visitingHours?.start} - {site?.visitingHours?.end}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteDetails;
