import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTransportContext } from "../../hooks/useTransportContext";

// components
import TransportCard from "../../components/operations/TransportCard";
import Sort from "../../components/operations/Sort";

const TransportListView = ({ type }) => {
  const { sites, dispatch } = useTransportContext();
  const { user } = useAuthContext();
  const [filteredTransports, setFilteredTransports] = useState([]);
  const [filter, setFilter] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTransports = async () => {
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
      fetchTransports();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredTransports(
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
      <h1>{type} Transports</h1>
      <div className="sites">
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Sort />
        {filteredTransports
          ?.sort((a, b) => a.createdAt < b.createdAt)
          .map((site) => (
            <TransportCard key={site?._id} site={site} />
          ))}
      </div>
    </div>
  );
};

export default TransportListView;
