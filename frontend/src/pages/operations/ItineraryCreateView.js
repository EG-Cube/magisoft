import { useParams } from "react-router-dom";
import ItineraryCreateForm from "../../components/itinerary/ItineraryCreateForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const ItineraryCreateView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const API_URL = process.env.REACT_APP_API_URL;

  const [enquiry, setEnquiry] = useState();

  useEffect(() => {
    const fetchEnquiry = async () => {
      const response = await axios.get(`${API_URL}/api/enquiry/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setEnquiry(response.data);
    };

    if (user) {
      fetchEnquiry();
    }
  }, [user, id]);

  return <ItineraryCreateForm enquiry={enquiry} />;
};

export default ItineraryCreateView;
