import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

// components
import SiteDetails from "../../components/operations/SiteDetails";
import { useParams } from "react-router-dom";

const SiteDetailView = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  
  const API_URL = process.env.REACT_APP_API_URL;

  const [site, setSite] = useState();

  useEffect(() => {
    const fetchSite = async () => {
      const response = await axios.get(
        `${API_URL}/api/site/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSite(response.data);
    };

    if (user) {
      fetchSite();
    }
  }, [user, id]);

  return (
      <div className="home">
        <div className="sites">
          {site && <SiteDetails key={id} site={site} />}
        </div>
      </div>
  );
};

export default SiteDetailView;
