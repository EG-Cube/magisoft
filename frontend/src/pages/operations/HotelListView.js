import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHotelContext } from "../../hooks/useHotelContext";

// components
import HotelCard from "../../components/operations/HotelCard";
import Sort from "../../components/operations/Sort";

const HotelListView = ({ type }) => {
  const { sites, dispatch } = useHotelContext();
  const { user } = useAuthContext();
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filter, setFilter] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchHotels = async () => {
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
      fetchHotels();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredHotels(
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
      <h1>{type} Hotels</h1>
      <div className="sites">
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Sort />
        {filteredHotels
          ?.sort((a, b) => a.createdAt < b.createdAt)
          .map((site) => (
            <HotelCard key={site?._id} site={site} />
          ))}
      </div>
    </div>
  );
};

export default HotelListView;
