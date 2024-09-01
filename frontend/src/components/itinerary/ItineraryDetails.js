import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import "../../styles/ItinerariesDetails.css";

import editBtn from "../../assets/edit.png";
import deleteBtn from "../../assets/delete.png";
import { useEffect, useState } from "react";

const ItineraryDetails = ({ itinerary }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const [sites, setSites] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [transports, setTransports] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [enquiry, setEnquiry] = useState(null);
  const [error, setError] = useState("");

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
          enquiryResponse,
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
          fetch(`${API_URL}/api/enquiry/${itinerary?.enquiryId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
        ]);

        const [sitesData, hotelsData, transportsData, restaurantsData, enquiryData] =
          await Promise.all([
            sitesResponse.json(),
            hotelsResponse.json(),
            transportsResponse.json(),
            restaurantsResponse.json(),
            enquiryResponse.json(),
          ]);

        if (sitesResponse.ok) setSites(sitesData);
        if (hotelsResponse.ok) setHotels(hotelsData);
        if (transportsResponse.ok) setTransports(transportsData);
        if (restaurantsResponse.ok) setRestaurants(restaurantsData);
        if (enquiryResponse.ok) setEnquiry(enquiryData);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, [user, API_URL, itinerary?.enquiryId]);

  const handleEdit = () => {
    navigate(`/operations/itinerary/edit/${itinerary?._id}`);
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/api/itinerary/${itinerary?._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        navigate(`/operations/itinerary/list`);
      }
    } catch (err) {
      console.error("Failed to delete the itinerary", err);
    }
  };

  const formatEvents = (events) => {
    if (!events || events.length === 0) return "No events";

    return events.map((event, index) => {
      const getEventDetail = (label, value) => (
        <div key={index} className="event-detail">
          <strong>{label}:</strong>
          <div>{value || 'Unknown'}</div>
        </div>
      );

      switch (event?.type) {
        case 'site':
          return (
            <div key={index} className="event">
              {getEventDetail('Site', event?.siteRef?.name)}
              {getEventDetail('Start Time', event?.startTime)}
              {getEventDetail('End Time', event?.endTime)}
              {getEventDetail('Duration', `${event?.duration} hours`)}
            </div>
          );
        case 'transport':
          return (
            <div key={index} className="event">
              {getEventDetail('Transport', event?.transportRef?.modeOfTransport)}
              {getEventDetail('From', event?.from)}
              {getEventDetail('To', event?.to)}
              {getEventDetail('Distance', `${event?.distance || 'Unknown'} km`)}
              {getEventDetail('Start Time', event?.startTime)}
              {getEventDetail('End Time', event?.endTime)}
              {getEventDetail('Duration', `${event?.duration} hours`)}
            </div>
          );
        case 'hotel':
          return (
            <div key={index} className="event">
              {getEventDetail('Hotel', event?.hotelRef?.name)}
              {getEventDetail('Room Type', event?.roomType)}
              {getEventDetail('Meal Plan', event?.mealPlan)}
              {getEventDetail('Start Time', event?.startTime)}
              {getEventDetail('End Time', event?.endTime)}
              {getEventDetail('Duration', `${event?.duration} hours`)}
            </div>
          );
        case 'restaurant':
          return (
            <div key={index} className="event">
              {getEventDetail('Restaurant', event?.restaurantRef?.name)}
              {getEventDetail('Meal Type', event?.mealType)}
              {getEventDetail('Start Time', event?.startTime)}
              {getEventDetail('End Time', event?.endTime)}
              {getEventDetail('Duration', `${event?.duration} hours`)}
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
    <div className="itinerary-details">
      <div className="main-container">
        <div className="package-container">
          <div>
            <strong>Package Name:</strong> {itinerary?.name}
          </div>
          {/* <div className="status">
            <div className="actions">
              <button className="edit-btn" onClick={handleEdit}>
                <img src={editBtn} alt="Edit" />
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                <img src={deleteBtn} alt="Delete" />
              </button>
            </div>
          </div> */}
          <div>
            <strong>Description:</strong> {itinerary?.description}
          </div>
        </div>
        <div className="enquiry-container">
          <div>
            <div><strong>Enquiry Details:</strong></div>
            {/* Add enquiry details component or information here */}
          </div>
        </div>
      </div>
      <div className="days-container">
        <div className="day-details">
          {itinerary?.days?.map((day, index) => (
            <div key={index} className="itinerary-day">
              <h3>Day {day.day}</h3>
              <div className="events">
                {formatEvents(day.events)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetails;
