import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRestaurantContext } from "../../hooks/useRestaurantContext";
import "../../styles/details.css";

import editBtn from "../../assets/edit.png";
import deleteBtn from "../../assets/delete.png";

const RestaurantDetails = ({ restaurant }) => {
  const { dispatch } = useRestaurantContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleEdit = async () => {
    navigate(`/operations/restaurant/edit/${restaurant?._id}`);
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`${API_URL}/api/restaurant/` + restaurant?._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_RESTAURANT", payload: json });
    }

    navigate(`/operations/restaurant/list`);
  };

  return (
    <div className="restaurant-details">
      <div className="restaurant-header">
        <div className="status">
          <div className="actions">
            <button className="edit-btn" onClick={handleEdit}>
              <img src={editBtn} alt="Edit" />
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <img src={deleteBtn} alt="Delete" />
            </button>
          </div>
          <span>{restaurant?.cuisine}</span>
        </div>
      </div>
      <div className="restaurant-content">
        <div className="row">
          <div>
            <div>Name:</div>
            <div>{restaurant?.name}</div>
          </div>
          <div>
            <div>Address:</div>
            <div>
              {restaurant?.address}, {restaurant?.city}, {restaurant?.state}, {restaurant?.country} -{" "}
              {restaurant?.pincode}
            </div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Contact Number:</div>
            <div>{restaurant?.contactNumber}</div>
          </div>
          <div>
            <div>Email:</div>
            <div>{restaurant?.email}</div>
          </div>
          <div>
            <div>Website:</div>
            <div>{restaurant?.website}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Available Meals:</div>
            <div>{restaurant?.availableMeals?.join(", ")}</div>
          </div>
          <div>
            <div>Amenities:</div>
            <div>{restaurant?.amenities?.join(", ")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
