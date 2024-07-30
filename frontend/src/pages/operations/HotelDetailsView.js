import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

// components
import HotelDetails from "../../components/operations/HotelDetails";
import { useParams } from "react-router-dom";

const HotelDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  
  const API_URL = process.env.REACT_APP_API_URL;

  const [site, setHotel] = useState();

  useEffect(() => {
    const fetchHotel = async () => {
      const response = await axios.get(
        `${API_URL}/api/site/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setHotel(response.data);
    };

    if (user) {
      fetchHotel();
    }
  }, [user, id]);

  return (
      <div className="home">
        <div className="sites">
          {site && <HotelDetails key={id} site={site} />}
        </div>
      </div>
  );
};

export default HotelDetailView;
