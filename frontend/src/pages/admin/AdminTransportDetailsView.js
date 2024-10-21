import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

// components
import { useParams } from "react-router-dom";
import TransportDetails from "../../components/transport/TransportDetails";
import Spinner from "../../components/Spinner";

const AdminTransportDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  
  const API_URL = process.env.REACT_APP_API_URL;

  const [transport, setTransport] = useState();
  const [loading, setLoading] = useState(true); 

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
      setTransport(response.data);setLoading(false)

    };

    if (user) {
      fetchTransport();
    }
  }, [user, id]);

  return (
      <div className="home">{loading ? <Spinner/> : 
        <div className="enquiries">
          {transport && <TransportDetails key={id} transport={transport} isAdmin={true}/>}
        </div>}
      </div>
  );
};

export default AdminTransportDetailView;
