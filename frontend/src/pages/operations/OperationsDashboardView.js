import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSiteContext } from "../../hooks/useSiteContext";

// components
import SiteCard from "../../components/operations/SiteCard";
import Sort from "../../components/operations/Sort";
import "../../styles/DashboardView.css";

const OperationsDashboardView = () => {
  const { sites, dispatch } = useSiteContext();
  const { user } = useAuthContext();
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortCriteria, setSortCriteria] = useState("Date");
  
  const API_URL = process.env.REACT_APP_API_URL;

  // useEffect(() => {
  //   const fetchEnquiries = async () => {
  //     const response = await fetch(`${API_URL}/api/site/filter/${user.user._id}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });
  //     const json = await response.json();

  //     if (response.ok) {
  //       dispatch({ type: "SET_SITES", payload: json });
  //     }
  //   };

  //   if (user) {
  //     fetchEnquiries();
  //   }
  // }, [dispatch, user]);

  // useEffect(() => {
  //   setFilteredEnquiries(
  //     sites?.filter((site) => {
  //       const filterLower = filter.toLowerCase();
  //       return (
  //         site.firstName.toLowerCase().includes(filterLower) ||
  //         site.lastName.toLowerCase().includes(filterLower) ||
  //         site.fromDate.toLowerCase().includes(filterLower) ||
  //         site.toDate.toLowerCase().includes(filterLower) ||
  //         site.destinations.some((destination) =>
  //           destination.toLowerCase().includes(filterLower)
  //         ) ||
  //         site.fromLocation.toLowerCase().includes(filterLower) ||
  //         site.toLocation.toLowerCase().includes(filterLower) ||
  //         site.budget.toString().includes(filterLower) ||
  //         site.roomComments.toLowerCase().includes(filterLower) ||
  //         site.phoneNumber.toLowerCase().includes(filterLower) ||
  //         site.emailAddress.toLowerCase().includes(filterLower) ||
  //         site.mealPlan.toLowerCase().includes(filterLower) ||
  //         site.purpose.toLowerCase().includes(filterLower) ||
  //         site.remarks.toLowerCase().includes(filterLower) ||
  //         site.status.toLowerCase().includes(filterLower)
  //       );
  //     })
  //   );
  // }, [filter, sites]);

  return (
    <div className="home">
      <div className="sites">
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Sort sortCriteria={sortCriteria} set />
        {filteredEnquiries?.map((site) => (
          <SiteCard key={site._id} site={site} />
        ))}
      </div>
    </div>
  );
};

export default OperationsDashboardView;
