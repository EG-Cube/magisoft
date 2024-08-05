import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

// components
import ItineraryDetails from "../../components/itinerary/ItineraryDetails";

const ItineraryDetailsView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  
  const API_URL = process.env.REACT_APP_API_URL;

  const [itinerary, setItinerary] = useState();

  useEffect(() => {
    const fetchItinerary = async () => {
      const response = await axios.get(
        `${API_URL}/api/itinerary/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setItinerary(response.data);
    };

    if (user) {
      fetchItinerary();
    }
  }, [user, id]);

  return (
    <div className="home">
      <div className="itinerary">
        {itinerary && <ItineraryDetails key={id} itinerary={itinerary} />}
      </div>
    </div>
  );
};

export default ItineraryDetailsView;
