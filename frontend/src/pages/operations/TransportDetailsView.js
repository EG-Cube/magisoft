import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import TransportDetails from "../../components/transport/TransportDetails";
import { useParams } from "react-router-dom";

const TransportDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const API_URL = process.env.REACT_APP_API_URL;

  const [transport, setTransport] = useState();

  useEffect(() => {
    const fetchTransport = async () => {
      const response = await axios.get(
        `${API_URL}/api/transport/${id}`,
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
  }, [user, id, API_URL]);

  return (
    <div className="home">
      <div className="transports">
        {transport && <TransportDetails key={id} transport={transport} />}
      </div>
    </div>
  );
};

export default TransportDetailView;
