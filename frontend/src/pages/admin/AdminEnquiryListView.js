import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEnquiryContext } from "../../hooks/useEnquiryContext";

// components
import EnquiryCard from "../../components/enquiry/EnquiryCard";
import Sort from "../../components/sales/Sort";

const AdminEnquiryListView = ({ type }) => {
  const { enquiries, dispatch } = useEnquiryContext();
  const { user } = useAuthContext();
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [filter, setFilter] = useState("");
  
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchEnquiries = async () => {
      const response = await fetch(`${API_URL}/api/enquiry`, {
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
          enquiry.status === type &&
          (enquiry.firstName.toLowerCase().includes(filterLower) ||
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
            enquiry.remarks.toLowerCase().includes(filterLower))
        );
      })
    );
  }, [filter, enquiries, type]);

  return (
    <div className="home">
      <h1>{type} Enquiries</h1>
      <div className="enquiries">
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {/* <Sort /> */}
        {filteredEnquiries
          ?.sort((a, b) => a.createdAt < b.createdAt)
          .map((enquiry) => (
            <EnquiryCard key={enquiry._id} enquiry={enquiry} isAdmin={true} redirectLink={"/admin/enquiry/view/"}/>
          ))}
      </div>
    </div>
  );
};

export default AdminEnquiryListView;
