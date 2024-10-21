import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import "../../styles/ItinerariesDetails.css";
import editBtn from "../../assets/edit.png";
import deleteBtn from "../../assets/delete.png";
import { useEffect, useState } from "react";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import EnquiryCard from "../enquiry/EnquiryCard";
import EnquiryDetails from "../enquiry/EnquiryDetails";
import * as XLSX from "xlsx"; // Import xlsx library
import Spinner from "../Spinner";

const ItineraryDetails = ({ itinerary, enquiry }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const [sites, setSites] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [transports, setTransports] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setError("You must be logged in");
        return;
      }
      try {

        const [
          sitesResponse,
          hotelsResponse,
          transportsResponse,
          restaurantsResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/api/site`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          fetch(`${API_URL}/api/hotel`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          fetch(`${API_URL}/api/transport`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          fetch(`${API_URL}/api/restaurant`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
        ]);

        const [sitesData, hotelsData, transportsData, restaurantsData] =
          await Promise.all([
            sitesResponse.json(),
            hotelsResponse.json(),
            transportsResponse.json(),
            restaurantsResponse.json(),
          ]);

        if (sitesResponse.ok) setSites(sitesData);
        if (hotelsResponse.ok) setHotels(hotelsData);
        if (transportsResponse.ok) setTransports(transportsData);
        if (restaurantsResponse.ok) setRestaurants(restaurantsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };
  
    fetchData();
  }, [user, API_URL]);

  const handleEdit = () => {
    navigate(`/operations/itinerary/edit/${itinerary?._id}`);
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await axios.delete(
        `${API_URL}/api/itinerary/${itinerary?._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate(`/operations/itinerary/list`);
      }
    } catch (err) {
      console.error("Failed to delete the itinerary", err);
    }
  };

  const exportToExcel = () => {
    const data = [];

    itinerary?.days?.forEach((day) => {
      day.events.forEach((event) => {
        data.push({
          "Day Number": day.day,
          "Start Time": event.startTime || "Unknown",
          "End Time": event.endTime || "Unknown",
          "Event Type": event.type,
          "Site/Hotel/Restaurant/Transport Name":
            event?.siteRef?.name ||
            event?.hotelRef?.name ||
            event?.restaurantRef?.name ||
            event?.transportRef?.modeOfTransport ||
            "Unknown",
          "Event Details": event.details || "N/A",
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Itinerary");

    XLSX.writeFile(workbook, "ItineraryDetails.xlsx");
  };

  const formatEvents = (events) => {
    if (!events || events.length === 0)
      return <div className="no-events">No events</div>;

    return events.map((event, index) => {
      const renderDetails = (label, value) => (
        <div className="detail" key={`${label}-${index}`}>
          <span className="label">{label}</span>
          <span className="data">{value || "Unknown"}</span>
        </div>
      );

      switch (event?.type) {
        case "site":
          return (
            <div key={index} className="event">
              <div className="event-details">
                {renderDetails("Site", event?.siteRef?.name)}
                {renderDetails("Duration", `${event?.duration} hours`)}
                {renderDetails("Start Time", event?.startTime)}
                {renderDetails("End Time", event?.endTime)}
              </div>
            </div>
          );
        case "transport":
          return (
            <div key={index} className="event">
              <div className="event-details">
                {renderDetails(
                  "Transport",
                  event?.transportRef?.modeOfTransport
                )}
                {renderDetails("From", event?.from)}
                {renderDetails("To", event?.to)}
                {renderDetails("Distance", `${event?.distance} km`)}
                {renderDetails("Duration", `${event?.duration} hours`)}
                {renderDetails("Start Time", event?.startTime)}
                {renderDetails("End Time", event?.endTime)}
              </div>
            </div>
          );
        case "hotel":
          return (
            <div key={index} className="event">
              <div className="event-details">
                {renderDetails("Hotel", event?.hotelRef?.name)}
                {renderDetails("Room Type", event?.roomType)}
                {renderDetails("Meal Plan", event?.mealPlan)}
                {renderDetails("Duration", `${event?.duration} hours`)}
                {renderDetails("Start Time", event?.startTime)}
                {renderDetails("End Time", event?.endTime)}
              </div>
            </div>
          );
        case "restaurant":
          return (
            <div key={index} className="event">
              <div className="event-details">
                {renderDetails("Restaurant", event?.restaurantRef?.name)}
                {renderDetails("Meal Type", event?.mealType)}
                {renderDetails("Duration", `${event?.duration} hours`)}
                {renderDetails("Start Time", event?.startTime)}
                {renderDetails("End Time", event?.endTime)}
              </div>
            </div>
          );
        default:
          return (
            <div key={index} className="event">
              <div>Unknown Event Type</div>
            </div>
          );
      }
    });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="itinerary-details">
          <div className="main-container">
            <div className="package-container">
              <div className="package-name">{itinerary?.name}</div>
              <div className="package-description">
                {itinerary?.description}
              </div>
            </div>
            <div className="enquiry-container">
              {/* <h1>Enquiry Details</h1> */}
              {enquiry && (
                <EnquiryDetails key={enquiry._id} enquiry={enquiry} minimal />
              )}
            </div>
          </div>
          <Tabs className="tabs-container">
            <TabList className="tabs-header">
              {itinerary?.days?.map((day, index) => (
                <Tab key={index} className="tab">
                  Day {day.day}
                </Tab>
              ))}
            </TabList>
            {itinerary?.days?.map((day, index) => (
              <TabPanel key={index} className="tab-panel">
                <div className="events">{formatEvents(day.events)}</div>
              </TabPanel>
            ))}
          </Tabs>
          <div className="inclusions-exclusions">
            <div>
              <div>Inclusions:</div>
              <ul>
                {itinerary?.inclusions?.map((item, index) => (
                  <li key={`inc-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div>Exclusions:</div>
              <ul>
                {itinerary?.exclusions?.map((item, index) => (
                  <li key={`exc-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="tandcs-disclaimers">
            <div>
              <div>Terms & Conditions:</div>
              <ul>
                {itinerary?.tandcs?.map((item, index) => (
                  <li key={`tac-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div>Disclaimer:</div>
              <ul>
                {itinerary?.disclaimers?.map((item, index) => (
                  <li key={`dis-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="actions">
            <button className="edit-btn" onClick={handleEdit}>
              <img src={editBtn} alt="Edit" />
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <img src={deleteBtn} alt="Delete" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ItineraryDetails;
