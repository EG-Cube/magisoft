import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import "../../styles/details.css";

import editBtn from "../../assets/edit.png";
import deleteBtn from "../../assets/delete.png";

const ItineraryDetails = ({ itinerary }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleEdit = async () => {
    navigate(`/operations/itinerary/edit/${itinerary?._id}`);
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await axios.delete(`${API_URL}/api/itinerary/${itinerary?._id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.status === 200) {
      navigate(`/operations/itinerary/list`);
    }
  };

  const formatSites = (sites) => {
    if (!sites || sites.length === 0) return "No sites";

    return sites.map((site) => site.name).join(", ");
  };

  return (
    <div className="itinerary-details">
      <div className="itinerary-header">
        <div className="status">
          <div className="actions">
            <button className="edit-btn" onClick={handleEdit}>
              <img src={editBtn} alt="Edit" />
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <img src={deleteBtn} alt="Delete" />
            </button>
          </div>
          <span>{itinerary?.name}</span>
        </div>
      </div>
      <div className="itinerary-content">
        <div className="row">
          <div>
            <div>Name:</div>
            <div>{itinerary?.name}</div>
          </div>
          <div>
            <div>Description:</div>
            <div>{itinerary?.description}</div>
          </div>
        </div>
        <div className="row">
          {itinerary.days.map((day, index) => (
            <div key={index} className="itinerary-day">
              <h3>Day {day.day}</h3>
              <div>Sites: {formatSites(day.sites)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetails;
