import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSiteContext } from "../../hooks/useSiteContext";

// components
import SiteCard from "../../components/operations/SiteCard";
import Sort from "../../components/operations/Sort";

const SiteListView = ({ type }) => {
  const { sites, dispatch } = useSiteContext();
  const { user } = useAuthContext();
  const [filteredSites, setFilteredSites] = useState([]);
  const [filter, setFilter] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchSites = async () => {
      const response = await fetch(`${API_URL}/api/site/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_SITES", payload: json });
      }
    };

    if (user) {
      fetchSites();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredSites(
      sites?.filter((site) => {
        const filterLower = filter?.toLowerCase();
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
      <div className="sites">
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Sort />
        {filteredSites
          ?.sort((a, b) => a.createdAt < b.createdAt)
          .map((site) => (
            <SiteCard key={site?._id} site={site} />
          ))}
      </div>
    </div>
  );
};

export default SiteListView;
