import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUserContext } from "../../hooks/useUserContext";

// components
import UserCard from "../../components/user/UserCard";
import Summary from "../../components/admin/Summary";
import "../../styles/DashboardView.css";

const AdminUserDashboardView = () => {
  const { users, dispatch } = useUserContext();
  const { user } = useAuthContext();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortCriteria, setSortCriteria] = useState("Date");
  
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${API_URL}/api/user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_USERS", payload: json });
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredUsers(
      users?.filter((user) => {
        const filterLower = filter.toLowerCase();
        return (
          user?.firstName.toLowerCase().includes(filterLower) ||
          user?.lastName.toLowerCase().includes(filterLower) ||
          user?.email.toLowerCase().includes(filterLower) ||
          user?.roles.some((role) => role.toLowerCase().includes(filterLower))
        );
      })
    );
  }, [filter, users]);

  return (
    <div className="home">
      <div className="users">
        <Summary users={users} />
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {/* <Sort sortCriteria={sortCriteria} set /> */}
        {filteredUsers?.map((user) => (
          <UserCard key={user?._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default AdminUserDashboardView;
