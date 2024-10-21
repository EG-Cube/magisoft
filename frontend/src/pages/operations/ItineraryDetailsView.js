import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

// components
import ItineraryDetails from "../../components/itinerary/ItineraryDetails";
import Spinner from "../../components/Spinner";

const ItineraryDetailsView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const API_URL = process.env.REACT_APP_API_URL;

  const [itinerary, setItinerary] = useState();
  const [enquiry, setEnquiry] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      const response = await axios.get(`${API_URL}/api/itinerary/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setItinerary(response.data);

      const enquiryResponse = await axios.get(
        `${API_URL}/api/enquiry/itinerary/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setEnquiry(enquiryResponse.data);

      console.log(enquiryResponse);
      setLoading(false);
    };

    if (user) {
      fetchItinerary();
    }
  }, [user, id]);

  return (
    <div className="home">
      <div className="itinerary">
        {loading ? (
          <Spinner />
        ) : (
          <ItineraryDetails key={id} itinerary={itinerary} enquiry={enquiry} />
        )}
      </div>
    </div>
  );
};

export default ItineraryDetailsView;
