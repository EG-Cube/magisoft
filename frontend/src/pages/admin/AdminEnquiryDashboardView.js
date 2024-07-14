import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEnquiryContext } from "../../hooks/useEnquiryContext";

// components
import Summary from "../../components/enquiry/Summary";
import Sort from "../../components/enquiry/Sort";
import "../../styles/DashboardView.css";
import AdminEnquiryCard from "../../components/admin/AdminEnquiryCard";
import { useUserContext } from "../../hooks/useUserContext";

const AdminEnquiryDashboardView = () => {
  const { enquiries, dispatch: enquiryDispatch } = useEnquiryContext();
  const { dispatch: userDispatch } = useUserContext()
  const { user } = useAuthContext();
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortCriteria, setSortCriteria] = useState("Date");

  useEffect(() => {
    const fetchEnquiries = async () => {
      const response = await fetch(`http://localhost:4000/api/enquiry/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        enquiryDispatch({ type: "SET_ENQUIRIES", payload: json });
      }
    };

    const fetchUsers = async () => {
      const response = await fetch(`http://localhost:4000/api/user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        userDispatch({ type: "SET_USERS", payload: json });
      }
    };

    if (user) {
      fetchUsers();
      fetchEnquiries();
    }
  }, [enquiryDispatch, userDispatch, user]);

  useEffect(() => {
    setFilteredEnquiries(
      enquiries?.filter((enquiry) => {
        const filterLower = filter.toLowerCase();
        return (
          enquiry.firstName.toLowerCase().includes(filterLower) ||
          enquiry.lastName.toLowerCase().includes(filterLower) ||
          enquiry.fromDate.toLowerCase().includes(filterLower) ||
          enquiry.toDate.toLowerCase().includes(filterLower) ||
          enquiry.destinations.some((destination) =>
            destination.toLowerCase().includes(filterLower)
          ) ||
          enquiry.fromLocation.toLowerCase().includes(filterLower) ||
          enquiry.toLocation.toLowerCase().includes(filterLower) ||
          enquiry.budget.toString().includes(filterLower) ||
          enquiry.roomComments.toLowerCase().includes(filterLower) ||
          enquiry.phoneNumber.toLowerCase().includes(filterLower) ||
          enquiry.emailAddress.toLowerCase().includes(filterLower) ||
          enquiry.mealPlan.toLowerCase().includes(filterLower) ||
          enquiry.purpose.toLowerCase().includes(filterLower) ||
          enquiry.remarks.toLowerCase().includes(filterLower) ||
          enquiry.status.toLowerCase().includes(filterLower)
        );
      })
    );
  }, [filter, enquiries]);

  return (
    <div className="home">
      <div className="enquiries">
        <Summary enquiries={enquiries} />
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Sort sortCriteria={sortCriteria} set />
        {filteredEnquiries?.map((enquiry) => (
          <AdminEnquiryCard key={enquiry._id} enquiry={enquiry} />
        ))}
      </div>
    </div>
  );
};

export default AdminEnquiryDashboardView;