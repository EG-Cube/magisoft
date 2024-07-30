import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

// components
import RestaurantDetails from "../../components/operations/RestaurantDetails";
import { useParams } from "react-router-dom";

const RestaurantDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  
  const API_URL = process.env.REACT_APP_API_URL;

  const [site, setRestaurant] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await axios.get(
        `${API_URL}/api/site/${id}`,
        {
          method: "GET",
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
  }, [user, id]);

  return (
      <div className="home">
        <div className="sites">
          {site && <RestaurantDetails key={id} site={site} />}
        </div>
      </div>
  );
};

export default RestaurantDetailView;
