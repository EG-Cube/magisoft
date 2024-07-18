import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSiteContext } from "../../hooks/useSiteContext";

// components
import SiteCard from "../../components/site/SiteCard";
import Sort from "../../components/site/Sort";

const SiteListView = ({ type }) => {
  const { sites, dispatch } = useSiteContext();
  const { user } = useAuthContext();
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [filter, setFilter] = useState("");
  
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchEnquiries = async () => {
      const response = await fetch(
        `${API_URL}/api/site/filter/${user?.user?._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_SITES", payload: json });
      }
    };

    if (user) {
      fetchEnquiries();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredEnquiries(
      sites?.filter((site) => {
        const filterLower = filter.toLowerCase();
        return (
          site.status === type &&
          (site.firstName.toLowerCase().includes(filterLower) ||
            site.lastName.toLowerCase().includes(filterLower) ||
            site.fromDate.toLowerCase().includes(filterLower) ||
            site.toDate.toLowerCase().includes(filterLower) ||
            site.destinations.some((destination) =>
              destination.toLowerCase().includes(filterLower)
            ) ||
            site.fromLocation.toLowerCase().includes(filterLower) ||
            site.toLocation.toLowerCase().includes(filterLower) ||
            site.budget.toString().includes(filterLower) ||
            site.roomComments.toLowerCase().includes(filterLower) ||
            site.phoneNumber.toLowerCase().includes(filterLower) ||
            site.emailAddress.toLowerCase().includes(filterLower) ||
            site.mealPlan.toLowerCase().includes(filterLower) ||
            site.purpose.toLowerCase().includes(filterLower) ||
            site.remarks.toLowerCase().includes(filterLower))
        );
      })
    );
  }, [filter, sites, type]);

  return (
    <div className="home">
      <h1>{type} Enquiries</h1>
      <div className="sites">
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Sort />
        {filteredEnquiries
          ?.sort((a, b) => a.createdAt < b.createdAt)
          .map((site) => (
            <SiteCard key={site._id} site={site} />
          ))}
      </div>
    </div>
  );
};

export default SiteListView;
