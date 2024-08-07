import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHotelContext } from "../../hooks/useHotelContext";
import { Link } from "react-router-dom";

// components
import HotelCard from "../../components/hotel/HotelCard";
import Sort from "../../components/operations/Sort";

const HotelListView = ({ type }) => {
  const { hotels, dispatch } = useHotelContext(); // Use 'hotels' instead of 'sites'
  const { user } = useAuthContext();
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filter, setFilter] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await fetch(`${API_URL}/api/hotel/`, { // Updated endpoint
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_HOTELS", payload: json }); // Updated action type
      }
    };

    if (user) {
      fetchHotels();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredHotels(
      hotels?.filter((hotel) => { // Use 'hotel' instead of 'site'
        const filterLower = filter?.toLowerCase();
        return (
          hotel?.name.toLowerCase().includes(filterLower) ||
          hotel?.address.toLowerCase().includes(filterLower) ||
          hotel?.city.toLowerCase().includes(filterLower) ||
          hotel?.state.toLowerCase().includes(filterLower) ||
          hotel?.country.toLowerCase().includes(filterLower) ||
          hotel?.pincode.toLowerCase().includes(filterLower) ||
          hotel?.availableRoomTypes.join(", ").toLowerCase().includes(filterLower) ||
          hotel?.availableMealPlans.join(", ").toLowerCase().includes(filterLower)
        );
      })
    );
  }, [filter, hotels, type]);

  return (
    <div className="home">
      <div className="row">
        <h1>{type} Hotels</h1>
        <Link to="/operations/hotel/create" className="nav-button">
          New Hotel
        </Link>
      </div>
      <div className="hotels"> {/* Changed className to reflect hotels */}
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {/* <Sort /> */}
        {filteredHotels
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date
          .map((hotel) => (
            <HotelCard key={hotel?._id} hotel={hotel} />
          ))}
      </div>
    </div>
  );
};

export default HotelListView;
