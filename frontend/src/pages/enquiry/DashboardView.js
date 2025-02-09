import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEnquiryContext } from "../../hooks/useEnquiryContext";

// components
import EnquiryCard from "../../components/EnquiryCard";
import Summary from "../../components/Summary";
import Sort from "../../components/Sort";
import "../../styles/DashboardView.css";
import { useNavigate } from "react-router-dom";

const DashboardView = () => {
  const { enquiries, dispatch } = useEnquiryContext();
  const { user } = useAuthContext();
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortCriteria, setSortCriteria] = useState("Date");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnquiries = async () => {
      const response = await fetch("http://localhost:4000/api/enquiry", {
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
          enquiry.enteredBy.toLowerCase().includes(filterLower) ||
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
          <EnquiryCard key={enquiry._id} enquiry={enquiry} />
        ))}
      </div>
    </div>
  );
};

export default DashboardView;
