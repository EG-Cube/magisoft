import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import RestaurantDetails from "../../components/operations/RestaurantDetails";
import { useParams } from "react-router-dom";

const RestaurantDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  
  const API_URL = process.env.REACT_APP_API_URL;

  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await axios.get(
        `${API_URL}/api/restaurant/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setRestaurant(response.data);
    };

    if (user) {
      fetchRestaurant();
    }
  }, [user, id, API_URL]); // Added API_URL to dependencies

  return (
    <div className="home">
      <div className="restaurants">
        {restaurant && <RestaurantDetails key={id} restaurant={restaurant} />}
      </div>
    </div>
  );
};

export default RestaurantDetailView;
