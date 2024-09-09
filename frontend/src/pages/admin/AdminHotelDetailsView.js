import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

// components
import { useParams } from "react-router-dom";
import HotelDetails from "../../components/hotel/HotelDetails";

const AdminHotelDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  
  const API_URL = process.env.REACT_APP_API_URL;

  const [hotel, setHotel] = useState();

  useEffect(() => {
    const fetchHotel = async () => {
      const response = await axios.get(
        `${API_URL}/api/hotel/${id}`,
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
        <div className="hotels">
          {hotel && <HotelDetails key={id} hotel={hotel} isAdmin={true}/>}
        </div>
      </div>
  );
};

export default AdminHotelDetailView;
