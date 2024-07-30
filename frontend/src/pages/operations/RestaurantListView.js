import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRestaurantContext } from "../../hooks/useRestaurantContext";

// components
import RestaurantCard from "../../components/operations/RestaurantCard";
import Sort from "../../components/operations/Sort";

const RestaurantListView = ({ type }) => {
  const { sites, dispatch } = useRestaurantContext();
  const { user } = useAuthContext();
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filter, setFilter] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchRestaurants = async () => {
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
      fetchRestaurants();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredRestaurants(
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
      <h1>{type} Restaurants</h1>
      <div className="sites">
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Sort />
        {filteredRestaurants
          ?.sort((a, b) => a.createdAt < b.createdAt)
          .map((site) => (
            <RestaurantCard key={site?._id} site={site} />
          ))}
      </div>
    </div>
  );
};

export default RestaurantListView;
