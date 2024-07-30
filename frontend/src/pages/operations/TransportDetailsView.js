import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

// components
import TransportDetails from "../../components/operations/TransportDetails";
import { useParams } from "react-router-dom";

const TransportDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  
  const API_URL = process.env.REACT_APP_API_URL;

  const [site, setTransport] = useState();

  useEffect(() => {
    const fetchTransport = async () => {
      const response = await axios.get(
        `${API_URL}/api/site/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setTransport(response.data);
    };

    if (user) {
      fetchTransport();
    }
  }, [user, id]);

  return (
      <div className="home">
        <div className="sites">
          {site && <TransportDetails key={id} site={site} />}
        </div>
      </div>
  );
};

export default TransportDetailView;
