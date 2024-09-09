import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

// components
import { useParams } from "react-router-dom";
import RestaurantDetails from "../../components/restaurant/RestaurantDetails";

const AdminRestaurantDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  
  const API_URL = process.env.REACT_APP_API_URL;

  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await axios.get(
        `${API_URL}/api/restaurant/${id}`,
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
        <div className="enquiries">
          {restaurant && <RestaurantDetails key={id} restaurant={restaurant} isAdmin={true}/>}
        </div>
      </div>
  );
};

export default AdminRestaurantDetailView;
