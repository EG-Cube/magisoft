import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTransportContext } from "../../hooks/useTransportContext";
import "../../styles/details.css";

import editBtn from "../../assets/edit.png";
import deleteBtn from "../../assets/delete.png";

const TransportDetails = ({ transport }) => {
  const { dispatch } = useTransportContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleEdit = async () => {
    navigate(`/operations/transport/edit/${transport?._id}`);
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`${API_URL}/api/transport/` + transport?._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TRANSPORT", payload: json });
    }

    navigate(`/operations/transport/list`);
  };

  const getTypeStyle = (modeOfTransport) => {
    switch (modeOfTransport) {
      case "Cab":
        return { backgroundColor: "#FDD1D2", color: "black" };
      case "Bus":
        return { backgroundColor: "#87cefa", color: "black" };
      case "Train":
        return { backgroundColor: "#98fb98", color: "black" };
      case "Flight":
        return { backgroundColor: "#d3d3d3", color: "black" };
      case "Ship":
        return { backgroundColor: "#ffe86b", color: "black" };
      default:
        return { backgroundColor: "#fff", color: "black" };
    }
  };

  return (
    <div className="transport-details">
      <div className="transport-header">
        <div className="status">
          <div className="actions">
            <button className="edit-btn" onClick={handleEdit}>
              <img src={editBtn} alt="Edit" />
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <img src={deleteBtn} alt="Delete" />
            </button>
          </div>
          <span style={getTypeStyle(transport?.modeOfTransport)}>
            {transport?.modeOfTransport}
          </span>
        </div>
      </div>
      <div className="transport-content">
        <div className="row">
          <div>
            <div>Company:</div>
            <div>{transport?.company}</div>
          </div>
          <div>
            <div>From Location:</div>
            <div>{transport?.fromLocation}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>To Location:</div>
            <div>{transport?.toLocation}</div>
          </div>
          <div>
            <div>Contact Number:</div>
            <div>{transport?.contactNumber}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Email:</div>
            <div>{transport?.email}</div>
          </div>
          <div>
            <div>Description:</div>
            <div>{transport?.description}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Distance:</div>
            <div>{transport?.distance} km</div>
          </div>
          <div>
            <div>Duration:</div>
            <div>{transport?.duration} hours</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportDetails;
