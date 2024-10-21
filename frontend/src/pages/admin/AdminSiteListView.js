import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSiteContext } from "../../hooks/useSiteContext";

// components
import SiteCard from "../../components/site/SiteCard";
import Sort from "../../components/sales/Sort";
import Spinner from "../../components/Spinner";

const AdminSiteListView = ({ type }) => {
  const { sites, dispatch } = useSiteContext();
  const { user } = useAuthContext();
  const [filteredSites, setFilteredSites] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchSites = async () => {
      const response = await fetch(`${API_URL}/api/site`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_SITES", payload: json });
      }
      setLoading(false);
    };

    if (user) {
      fetchSites();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredSites(
      sites?.filter((site) => {
        const filterLower = filter.toLowerCase();
        return (
          site?.name.toLowerCase().includes(filterLower) ||
          site?.address.toLowerCase().includes(filterLower) ||
          site?.city.toLowerCase().includes(filterLower) ||
          site?.state.toLowerCase().includes(filterLower) ||
          site?.country.toLowerCase().includes(filterLower) ||
          site?.pincode.toLowerCase().includes(filterLower) ||
          site?.duration.toLowerCase().includes(filterLower) ||
          site?.type.toString().includes(filterLower)
        );
      })
    );
  }, [filter, sites, type]);

  return (
    <div className="home">
      <h1>{type} Sites</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="sites">
          <input
            id="search"
            type="text"
            placeholder="Search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          {/* <Sort /> */}
          {filteredSites
            ?.sort((a, b) => a.createdAt < b.createdAt)
            .map((site) => (
              <SiteCard
                key={site._id}
                site={site}
                isAdmin={true}
                redirectLink={"/admin/site/view/"}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminSiteListView;
