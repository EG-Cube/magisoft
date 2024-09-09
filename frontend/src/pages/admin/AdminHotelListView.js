import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHotelContext } from "../../hooks/useHotelContext";

// components
import HotelCard from "../../components/hotel/HotelCard";
import Sort from "../../components/sales/Sort";

const AdminHotelListView = () => {
  const { hotels, dispatch } = useHotelContext();
  const { user } = useAuthContext();
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filter, setFilter] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await fetch(`${API_URL}/api/hotel`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_HOTELS", payload: json });
      }
    };

    if (user) {
      fetchHotels();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredHotels(
      hotels?.filter((hotel) => {
        const filterLower = filter.toLowerCase();
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
  }, [filter, hotels]);

  return (
    <div className="home">
      <h1>Hotels</h1>
      <div className="hotels">
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {/* <Sort /> */}
        {filteredHotels
          ?.sort((a, b) => a.createdAt < b.createdAt)
          .map((hotel) => (
            <HotelCard
              key={hotel?._id}
              hotel={hotel}
              // isAdmin={true}
              // redirectLink={"/admin/hotel/view/"}
            />
          ))}
      </div>
    </div>
  );
};

export default AdminHotelListView;
