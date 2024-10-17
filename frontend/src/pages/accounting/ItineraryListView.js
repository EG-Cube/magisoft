import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useItineraryContext } from "../../hooks/useItineraryContext";

// components
import ItineraryCard from "../../components/itinerary/ItineraryCard";
// import Sort from "../../components/accounting/Sort";

const ItineraryListView = ({ type }) => {
  const { itineraries, dispatch } = useItineraryContext();
  const { user } = useAuthContext();
  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [filter, setFilter] = useState("");
  

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchItineraries = async () => {
      const response = await fetch(`${API_URL}/api/itinerary/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      console.log(json);

      if (response.ok) {
        dispatch({ type: "SET_ITINERARIES", payload: json });
      }
    };

    if (user) {
      fetchItineraries();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredItineraries(
      itineraries?.filter((itinerary) => {
        const filterLower = filter?.toLowerCase();
        return (
          itinerary?.name.toLowerCase().includes(filterLower) ||
          itinerary?.description.toLowerCase().includes(filterLower)
        );
      })
    );
  }, [filter, itineraries, type]);

  return (
    <div className="home">
      <h1>{type} Itineraries</h1>
      <div className="itineraries">
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {filteredItineraries
          ?.sort((a, b) => a.createdAt < b.createdAt)
          .map((itinerary) => (
            <ItineraryCard key={itinerary?._id} itinerary={itinerary} />
          ))}
      </div>
    </div>
  );
};

export default ItineraryListView;
