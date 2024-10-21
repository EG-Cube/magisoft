import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import TransportDetails from "../../components/transport/TransportDetails";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

const TransportDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const API_URL = process.env.REACT_APP_API_URL;

  const [transport, setTransport] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransport = async () => {
      const response = await axios.get(`${API_URL}/api/transport/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTransport(response.data);
      setLoading(false);
    };

    if (user) {
      fetchTransport();
    }
  }, [user, id, API_URL]);

  return (
    <div className="home">
      <div className="transports">
        {loading ? (
          <Spinner />
        ) : (
          <TransportDetails key={id} transport={transport} />
        )}
      </div>
    </div>
  );
};

export default TransportDetailView;
