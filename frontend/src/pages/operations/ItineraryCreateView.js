import { useParams } from "react-router-dom";
import ItineraryCreateForm from "../../components/itinerary/ItineraryCreateForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";

const ItineraryCreateView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const API_URL = process.env.REACT_APP_API_URL;

  const [enquiry, setEnquiry] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiry = async () => {
      const response = await axios.get(`${API_URL}/api/enquiry/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setEnquiry(response.data);
      setLoading(false);
    };

    if (user) {
      fetchEnquiry();
    }
  }, [user, id]);

  return (
    <>{loading ? <Spinner /> : <ItineraryCreateForm enquiry={enquiry} />}</>
  );
};

export default ItineraryCreateView;
