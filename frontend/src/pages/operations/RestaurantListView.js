import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRestaurantContext } from "../../hooks/useRestaurantContext";
import { Link } from "react-router-dom";

// components
import RestaurantCard from "../../components/restaurant/RestaurantCard";
import Sort from "../../components/operations/Sort";
import Spinner from "../../components/Spinner";

const RestaurantListView = ({ type }) => {
  const { restaurants, dispatch } = useRestaurantContext(); // Changed from `sites` to `restaurants`
  const { user } = useAuthContext();
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(`${API_URL}/api/restaurant/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_RESTAURANTS", payload: json }); // Changed action type
      }
      setLoading(false);
    };

    if (user) {
      fetchRestaurants();
    }
  }, [dispatch, user, API_URL]); // Added API_URL to dependencies

  useEffect(() => {
    setFilteredRestaurants(
      restaurants?.filter((restaurant) => {
        // Changed from `site` to `restaurant`
        const filterLower = filter?.toLowerCase();
        return (
          restaurant?.name.toLowerCase().includes(filterLower) ||
          restaurant?.address.toLowerCase().includes(filterLower) ||
          restaurant?.city.toLowerCase().includes(filterLower) ||
          restaurant?.state.toLowerCase().includes(filterLower) ||
          restaurant?.country.toLowerCase().includes(filterLower) ||
          restaurant?.pincode.toLowerCase().includes(filterLower) ||
          restaurant?.cuisine.toLowerCase().includes(filterLower)
        );
      })
    );
  }, [filter, restaurants, type]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="home">
          <div className="row">
            <h1>{type} Restaurants</h1>
            <Link to="/operations/restaurant/create" className="nav-button">
              New Restaurant
            </Link>
          </div>
          <div className="restaurants">
            <input
              id="search"
              type="text"
              placeholder="Search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            {/* <Sort /> */}
            {filteredRestaurants
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Changed to sort correctly by date
              .map((restaurant) => (
                <RestaurantCard key={restaurant?._id} restaurant={restaurant} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantListView;
