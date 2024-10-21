import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useItineraryContext } from "../../hooks/useItineraryContext";
import { useEnquiryContext } from "../../hooks/useEnquiryContext";

// components
import ItineraryCard from "../../components/itinerary/ItineraryCard";
import Sort from "../../components/accounting/Sort";
import "../../styles/DashboardView.css";
import Summary from "../../components/accounting/Summary";
import EnquiryCard from "../../components/enquiry/EnquiryCard";
import Spinner from "../../components/Spinner";

const AccountingDashboardView = () => {
  const { itineraries, dispatch } = useItineraryContext();
  const { enquiries, dispatch: enquiryDispatch } = useEnquiryContext();
  const { user } = useAuthContext();
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortCriteria, setSortCriteria] = useState("Date");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchItineraries = async () => {
      const response = await fetch(
        `${API_URL}/api/itinerary/filter/${user.user._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      console.log(json);

      if (response.ok) {
        dispatch({ type: "SET_ITINERARIES", payload: json });
      }
    };

    const fetchEnquiries = async () => {
      const response = await fetch(
        `${API_URL}/api/enquiry/accounting/${user?.user?._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      console.log("Enquiries : ", json);

      if (response.ok) {
        enquiryDispatch({ type: "SET_ENQUIRIES", payload: json });
      }
      setLoading(false);
    };

    if (user) {
      fetchItineraries();
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
          enquiry.remarks.toLowerCase().includes(filterLower)
        );
      })
    );
  }, [filter, enquiries]);

  return (
    <div className="home">
      {loading ? (
        <Spinner />
      ) : (
        <div className="itineraries">
          {itineraries && enquiries && (
            <Summary itineraries={itineraries} enquiries={enquiries} />
          )}

          <input
            id="search"
            type="text"
            placeholder="Search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          {filteredEnquiries
            ?.sort((a, b) => a.createdAt < b.createdAt)
            .map((enquiry) => (
              <EnquiryCard
                key={enquiry._id}
                enquiry={enquiry}
                redirectLink={"/accounting/enquiry/view/"}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default AccountingDashboardView;