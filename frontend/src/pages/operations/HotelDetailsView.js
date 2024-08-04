import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

// components
import HotelDetails from "../../components/hotel/HotelDetails";
import { useParams } from "react-router-dom";

const HotelDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  
  const API_URL = process.env.REACT_APP_API_URL;

  const [hotel, setHotel] = useState(); // Updated state name

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/hotel/${id}`, { // Updated endpoint
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setHotel(response.data);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      }
    };

    if (user) {
      fetchHotel();
    }
  }, [user, id]);

  return (
    <div className="home">
      <div className="hotels"> {/* Changed className */}
        {hotel && <HotelDetails key={id} hotel={hotel} />} {/* Updated prop */}
      </div>
    </div>
  );
};

export default HotelDetailView;
