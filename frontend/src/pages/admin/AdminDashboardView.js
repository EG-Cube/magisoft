import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUserContext } from "../../hooks/useUserContext";

// components
import Sort from "../../components/Sort";
import "../../styles/DashboardView.css";
import { useNavigate } from "react-router-dom";
import UserList from "../../components/user/UserList";

const DashboardView = () => {
  const { users, dispatch } = useUserContext();
  const { user } = useAuthContext();
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortCriteria, setSortCriteria] = useState("Date");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnquiries = async () => {
      const response = await fetch("http://localhost:4000/api/user", {
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
      fetchEnquiries();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredEnquiries(
      users?.filter((admin) => {
        const filterLower = filter.toLowerCase();
        return (
          admin.firstName.toLowerCase().includes(filterLower) ||
          admin.lastName.toLowerCase().includes(filterLower) ||
          admin.fromDate.toLowerCase().includes(filterLower) ||
          admin.toDate.toLowerCase().includes(filterLower) ||
          admin.destinations.some((destination) =>
            destination.toLowerCase().includes(filterLower)
          ) ||
          admin.fromLocation.toLowerCase().includes(filterLower) ||
          admin.toLocation.toLowerCase().includes(filterLower) ||
          admin.budget.toString().includes(filterLower) ||
          admin.roomComments.toLowerCase().includes(filterLower) ||
          admin.phoneNumber.toLowerCase().includes(filterLower) ||
          admin.emailAddress.toLowerCase().includes(filterLower) ||
          admin.mealPlan.toLowerCase().includes(filterLower) ||
          admin.purpose.toLowerCase().includes(filterLower) ||
          admin.remarks.toLowerCase().includes(filterLower) ||
          admin.enteredBy.toLowerCase().includes(filterLower) ||
          admin.status.toLowerCase().includes(filterLower)
        );
      })
    );
  }, [filter, users]);

  return (
    <div className="home">
      <div className="users">
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Sort sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} />
        <UserList users={filteredEnquiries} sortCriteria={sortCriteria} />
      </div>
    </div>
  );
};

export default DashboardView;
