import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import "../../styles/details.css";

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
      } catch (err) {
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleEdit = async () => {
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

  const formatEvents = (events) => {
    if (!events || events.length === 0) return "No events";

    return events.map((event, index) => {
      switch (event?.type) {
        case "site":
          return (
            <div key={index} className="event">
              <div>Site: {event?.siteRef?.name || "Unknown"}</div>
              <div>Start Time: {event?.startTime}</div>
              <div>End Time: {event?.endTime}</div>
              <div>Duration: {event?.duration} hours</div>
            </div>
          );
        case "transport":
          return (
            <div key={index} className="event">
              <div>
                Transport: {event?.transportRef?.modeOfTransport || "Unknown"}
              </div>
              <div>From: {event?.from || "Unknown"}</div>
              <div>To: {event?.to || "Unknown"}</div>
              <div>Distance: {event?.distance || "Unknown"} km</div>
              <div>Start Time: {event?.startTime}</div>
              <div>End Time: {event?.endTime}</div>
              <div>Duration: {event?.duration} hours</div>
            </div>
          );
        case "hotel":
          return (
            <div key={index} className="event">
              <div>Hotel: {event?.hotelRef?.name || "Unknown"}</div>
              <div>Room Type: {event?.roomType || "Unknown"}</div>
              <div>Meal Plan: {event?.mealPlan || "Unknown"}</div>
              <div>Start Time: {event?.startTime}</div>
              <div>End Time: {event?.endTime}</div>
              <div>Duration: {event?.duration} hours</div>
            </div>
          );
        case "restaurant":
          return (
            <div key={index} className="event">
              <div>Restaurant: {event?.restaurantRef?.name || "Unknown"}</div>
              <div>Meal Type: {event?.mealType || "Unknown"}</div>
              <div>Start Time: {event?.startTime}</div>
              <div>End Time: {event?.endTime}</div>
              <div>Duration: {event?.duration} hours</div>
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
      <div className="itinerary-header">
        <div className="status">
          <div className="actions">
            <button className="edit-btn" onClick={handleEdit}>
              <img src={editBtn} alt="Edit" />
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <img src={deleteBtn} alt="Delete" />
            </button>
          </div>
          <span>{itinerary?.name}</span>
        </div>
      </div>
      <div className="itinerary-content">
        <div className="row">
          <div>
            <div>Name:</div>
            <div>{itinerary?.name}</div>
          </div>
          <div>
            <div>Description:</div>
            <div>{itinerary?.description}</div>
          </div>
        </div>
        <div className="row">
          {itinerary?.days?.map((day, index) => (
            <div key={index} className="itinerary-day">
              <h3>Day {day.day}</h3>
              <div className="events">{formatEvents(day.events)}</div>
            </div>
          ))}
        </div>
        <div className="row">
          <div>
            <div>Inclusions : </div>
            <ol>
              {itinerary?.inclusions?.map((item, index) => (
                <li key={`inc-${index}`}>{item}</li>
              ))}
            </ol>
          </div>
          <div>
            <div>Exclusions : </div>
            <ol>
              {itinerary?.exclusions?.map((item, index) => (
                <li key={`exc-${index}`}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className="row">
          <div>
            <div>Terms & Conditions : </div>
            <ol>
              {itinerary?.tandcs?.map((item, index) => (
                <li key={`tac-${index}`}>{item}</li>
              ))}
            </ol>
          </div>
          <div>
            <div>Disclaimer : </div>
            <ol>
              {itinerary?.disclaimers?.map((item, index) => (
                <li key={`dis-${index}`}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetails;
