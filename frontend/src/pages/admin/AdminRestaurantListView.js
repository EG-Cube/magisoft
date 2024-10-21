import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRestaurantContext } from "../../hooks/useRestaurantContext";

// components
import RestaurantCard from "../../components/restaurant/RestaurantCard";
import Sort from "../../components/sales/Sort";
import Spinner from "../../components/Spinner";

const AdminRestaurantListView = ({ type }) => {
  const { restaurants, dispatch } = useRestaurantContext();
  const { user } = useAuthContext();
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(`${API_URL}/api/restaurant`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_RESTAURANTS", payload: json });
      }
      setLoading(false);
    };

    if (user) {
      fetchRestaurants();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredRestaurants(
      restaurants?.filter((restaurant) => {
        const filterLower = filter.toLowerCase();
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
          <h1>{type} Restaurants</h1>
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
              ?.sort((a, b) => a.createdAt < b.createdAt)
              .map((restaurant) => (
                <RestaurantCard
                  key={restaurant._id}
                  restaurant={restaurant}
                  isAdmin={true}
                  redirectLink={"/admin/restaurant/view/"}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminRestaurantListView;
