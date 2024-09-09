import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useItineraryContext } from "../../hooks/useItineraryContext";

// components
import ItineraryCard from "../../components/itinerary/ItineraryCard";
import Sort from "../../components/sales/Sort";

const AdminItineraryListView = ({ type }) => {
  const { itineraries, dispatch } = useItineraryContext();
  const { user } = useAuthContext();
  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [filter, setFilter] = useState("");
  
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchItineraries = async () => {
      const response = await fetch(`${API_URL}/api/itinerary`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ENQUIRIES", payload: json });
      }
    };

    if (user) {
      fetchItineraries();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredItineraries(
      itineraries?.filter((itinerary) => {
        const filterLower = filter.toLowerCase();
        return (
          itinerary.status === type &&
          (itinerary.firstName.toLowerCase().includes(filterLower) ||
            itinerary.lastName.toLowerCase().includes(filterLower) ||
            itinerary.fromDate.toLowerCase().includes(filterLower) ||
            itinerary.toDate.toLowerCase().includes(filterLower) ||
            itinerary.destinations.some((destination) =>
              destination.toLowerCase().includes(filterLower)
            ) ||
            itinerary.fromLocation.toLowerCase().includes(filterLower) ||
            itinerary.toLocation.toLowerCase().includes(filterLower) ||
            itinerary.budget.toString().includes(filterLower) ||
            itinerary.roomComments.toLowerCase().includes(filterLower) ||
            itinerary.phoneNumber.toLowerCase().includes(filterLower) ||
            itinerary.emailAddress.toLowerCase().includes(filterLower) ||
            itinerary.mealPlan.toLowerCase().includes(filterLower) ||
            itinerary.purpose.toLowerCase().includes(filterLower) ||
            itinerary.remarks.toLowerCase().includes(filterLower))
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
        {/* <Sort /> */}
        {filteredItineraries
          ?.sort((a, b) => a.createdAt < b.createdAt)
          .map((itinerary) => (
            <ItineraryCard key={itinerary._id} itinerary={itinerary} isAdmin={true} redirectLink={"/admin/itinerary/view/"}/>
          ))}
      </div>
    </div>
  );
};

export default AdminItineraryListView;
