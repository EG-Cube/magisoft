import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEnquiryContext } from "../../hooks/useEnquiryContext";

// components
import EnquiryCard from "../../components/enquiry/EnquiryCard";
import Summary from "../../components/sales/Summary";
import Sort from "../../components/sales/Sort";
import "../../styles/DashboardView.css";

const SalesDashboardView = () => {
  const { enquiries, dispatch } = useEnquiryContext();
  const { user } = useAuthContext();
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortCriteria, setSortCriteria] = useState("Date");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchEnquiries = async () => {
      const response = await fetch(`${API_URL}/api/enquiry/sales/${user.user._id}`, {
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
          enquiry.status.toLowerCase().includes(filterLower)
        );
      })
    );
  }, [filter, enquiries]);

  const groupEnquiriesByMonth = (enquiries) => {
    const grouped = enquiries?.reduce((acc, enquiry) => {
      const date = new Date(enquiry.createdAt); // Assuming 'date' field exists in enquiry object
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const key = `${month} ${year}`;

      console.log(enquiry.date, month, year, key)
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(enquiry);

      return acc;
    }, {});

    console.log(grouped)
    return grouped;
  };

  const groupedEnquiries = groupEnquiriesByMonth(filteredEnquiries);

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
        {/* <Sort sortCriteria={sortCriteria} set /> */}
        {groupedEnquiries && Object.keys(groupedEnquiries)?.map((month) => (
          <div key={month} className="month-group">
            <h2>{month}</h2>
            {groupedEnquiries[month].map((enquiry) => (
              <EnquiryCard key={enquiry._id} enquiry={enquiry} redirectLink={"/sales/enquiry/view/"}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesDashboardView;
