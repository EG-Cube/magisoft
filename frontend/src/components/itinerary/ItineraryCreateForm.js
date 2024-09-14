import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/form1.css";
import EnquiryDetails from "../enquiry/EnquiryDetails";
import deleteBtn from "../../assets/delete.png";
import Select from "react-select";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useNavigate } from "react-router-dom";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import HotelIcon from "@mui/icons-material/Hotel";
import CommuteIcon from "@mui/icons-material/Commute";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

const ItineraryCreateForm = ({ enquiry }) => {
  const { user } = useAuthContext();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const initialDaysCount =
    Math.max(enquiry?.numberOfDays, enquiry?.numberOfNights) || 1;
  const initialDays = Array.from({ length: initialDaysCount }, (_, index) => ({
    day: index + 1,
    events: [],
  }));

  const initialFormData = {
    name: "",
    description: "",
    days: initialDays,
    inclusions: [" "],
    exclusions: [" "],
    tandcs: [" "],
    disclaimers: [" "],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [sites, setSites] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [transports, setTransports] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [newEvent, setNewEvent] = useState(null);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

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
  }, [user, API_URL]);

  useEffect(() => {
    const initialDaysCount =
      Math.max(enquiry?.numberOfDays, enquiry?.numberOfNights) || 1;
    const initialDays = Array.from(
      { length: initialDaysCount },
      (_, index) => ({
        day: index + 1,
        events: [],
      })
    );

    setFormData({
      name: "",
      description: "",
      days: initialDays,
      inclusions: [" "],
      exclusions: [" "],
      tandcs: [" "],
      disclaimers: [" "],
    });
  }, [enquiry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const getStartTime = (dayIndex, eventIndex) => {
    console.log(
      "getStartTime : ",
      dayIndex,
      eventIndex,
      formData?.days[dayIndex]?.events[eventIndex].endTime
    );
    return getEndTime(
      formData?.days[dayIndex]?.events[eventIndex].startTime,
      formData?.days[dayIndex]?.events[eventIndex].duration
    );
  };

  const getEndTime = (startTime, duration) => {
    if (!startTime || !duration) return "";

    const [hours, minutes] = startTime.split(":").map(Number);
    const durationHours = parseFloat(duration);

    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);

    console.log("Start Date : ", startDate.getHours(), startDate.getMinutes());

    const endDate = new Date(
      startDate.getTime() + durationHours * 60 * 60 * 1000
    );

    console.log("End Date : ", endDate.getHours(), endDate.getMinutes());

    const endHours = endDate.getHours().toString().padStart(2, "0");
    const endMinutes = endDate.getMinutes().toString().padStart(2, "0");

    // const newDays = [...formData.days];
    // newDays[dayIndex].events[eventIndex].endTime = `${endHours}:${endMinutes}`;
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   days: newDays,
    // }));

    return `${endHours}:${endMinutes}`;
  };

  const handleEventChange = (dayIndex, eventIndex, field, value) => {
    const newDays = [...formData.days];
    newDays[dayIndex].events[eventIndex][field] = value;

    // Automatically calculate endTime if startTime or duration is changed
    if (field === "startTime" || field === "duration") {
      const { startTime, duration } = newDays[dayIndex].events[eventIndex];

      // Ensure both startTime and duration are valid before calculating endTime
      if (startTime && duration) {
        const endTime = calculateEndTime(startTime, duration);
        newDays[dayIndex].events[eventIndex].endTime = endTime;
      }

      if (eventIndex != 0) {
        console.log(
          eventIndex,
          dayIndex,
          newDays[dayIndex].events[eventIndex].startTime,
          newDays[dayIndex].events[eventIndex - 1].endTime
        );
        newDays[dayIndex].events[eventIndex].startTime =
          newDays[dayIndex].events[eventIndex - 1].endTime;
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      days: newDays,
    }));

    console.log(formData);
  };

  // Utility function to calculate end time based on start time and duration
  const calculateEndTime = (startTime, duration) => {
    if (!startTime || !duration) return "";

    const [hours, minutes] = startTime.split(":").map(Number);
    const durationHours = parseFloat(duration);

    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(
      startDate.getTime() + durationHours * 60 * 60 * 1000
    );

    const endHours = endDate.getHours().toString().padStart(2, "0");
    const endMinutes = endDate.getMinutes().toString().padStart(2, "0");

    return `${endHours}:${endMinutes}`;
  };

  const handleAddDay = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      days: [
        ...prevFormData.days,
        {
          day: prevFormData.days.length + 1,
          events: [],
        },
      ],
    }));
  };

  const handleAddEvent = (dayIndex, eventType) => {
    const newDays = [...formData.days];

    newDays[dayIndex].events.push({
      type: eventType,
      siteRef: null,
      hotelRef: null,
      transportRef: null,
      restaurantRef: null,
      duration: 0,
      startTime: "",
      endTime: "",
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      days: newDays,
    }));
    setNewEvent(null); // Reset the newEvent state after adding
  };

  const handleRemoveDay = (index) => {
    const newDays = formData.days.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      days: newDays,
    }));
  };

  const handleRemoveEvent = (dayIndex, eventIndex) => {
    const newDays = [...formData.days];
    newDays[dayIndex].events = newDays[dayIndex].events.filter(
      (_, i) => i !== eventIndex
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      days: newDays,
    }));
  };
  const handleMoveUpEvent = (dayIndex, eventIndex) => {
    const newDays = [...formData.days];
    const events = newDays[dayIndex].events;

    // Ensure the event is not already the first one
    if (eventIndex > 0) {
      // Swap the event with the one above it
      [events[eventIndex - 1], events[eventIndex]] = [
        events[eventIndex],
        events[eventIndex - 1],
      ];

      setFormData((prevFormData) => ({
        ...prevFormData,
        days: newDays,
      }));
    }
  };

  const handleMoveDownEvent = (dayIndex, eventIndex) => {
    const newDays = [...formData.days];
    const events = newDays[dayIndex].events;

    // Ensure the event is not already the last one
    if (eventIndex < events.length - 1) {
      // Swap the event with the one below it
      [events[eventIndex + 1], events[eventIndex]] = [
        events[eventIndex],
        events[eventIndex + 1],
      ];

      setFormData((prevFormData) => ({
        ...prevFormData,
        days: newDays,
      }));
    }
  };

  const handleInclusionChange = (index, value) => {
    const newInclusions = [...formData.inclusions];
    newInclusions[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      inclusions: newInclusions,
    }));
  };

  const handleAddInclusion = () => {
    setFormData((prevFormData) => {
      console.log(prevFormData);
      return {
        ...prevFormData,
        inclusions: [...prevFormData.inclusions, ""],
      };
    });
  };

  const handleRemoveInclusion = (index) => {
    const newInclusions = formData.inclusions.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      inclusions: newInclusions,
    }));
  };

  const handleExclusionChange = (index, value) => {
    const newExclusions = [...formData.exclusions];
    newExclusions[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      exclusions: newExclusions,
    }));
  };

  const handleAddExclusion = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      exclusions: [...prevFormData.exclusions, ""],
    }));
  };

  const handleRemoveExclusion = (index) => {
    const newExclusions = formData.exclusions.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      exclusions: newExclusions,
    }));
  };

  const handleTandCChange = (index, value) => {
    const newTandCs = [...formData.tandcs];
    newTandCs[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      tandcs: newTandCs,
    }));
  };

  const handleAddTandC = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tandcs: [...prevFormData.tandcs, ""],
    }));
  };

  const handleRemoveTandC = (index) => {
    const newTandCs = formData.tandcs.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      tandcs: newTandCs,
    }));
  };

  const handleDisclaimerChange = (index, value) => {
    const newDisclaimers = [...formData.disclaimers];
    newDisclaimers[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      disclaimers: newDisclaimers,
    }));
  };

  //h

  const handleAddDisclaimer = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      disclaimers: [...prevFormData.disclaimers, ""],
    }));
  };

  const handleRemoveDisclaimer = (index) => {
    const newDisclaimers = formData.disclaimers.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      disclaimers: newDisclaimers,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const cleanedData = { ...formData };

    cleanedData.days = cleanedData.days.map((day) => {
      return {
        ...day,
        events: day.events.map((event) => {
          return {
            ...event,
            siteRef: event.siteRef || null,
            hotelRef: event.hotelRef || null,
            transportRef: event.transportRef || null,
            restaurantRef: event.restaurantRef || null,
          };
        }),
      };
    });

    const response = await fetch(`${API_URL}/api/itinerary`, {
      method: "POST",
      body: JSON.stringify(cleanedData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });

    const json = await response.json();
    console.log(response);

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
      return;
    }

    const updatedEnquiryResponse = await fetch(
      `${API_URL}/api/enquiry/${enquiry._id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          $push: { itineraries: json._id },
          activeItinerary: json._id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    const updatedEnquiry = await updatedEnquiryResponse.json();

    if (!updatedEnquiryResponse.ok) {
      setError(updatedEnquiry.error);
      return;
    }

    setFormData(initialFormData);
    setError(null);
    setEmptyFields([]);

    console.log("New itinerary added and set as active", updatedEnquiry);

    navigate(`/operations/itinerary/list`);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a New Itinerary</h3>

      {enquiry && <EnquiryDetails enquiry={enquiry} />}

      <div className="field-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          className={emptyFields.includes("name") ? "error" : ""}
        />
      </div>

      <div className="field-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={formData.description}
        />
      </div>

      <div className="field-group">
        <label>Days:</label>
        <Tabs>
          <TabList>
            {formData.days.map((day, index) => (
              <Tab key={index}>Day {index + 1}</Tab>
            ))}
          </TabList>

          {formData.days.map((day, dayIndex) => (
            <TabPanel key={dayIndex}>
              <div className="day-panel">
                <div className="row">
                  <label>Day {dayIndex + 1}:</label>
                  <button
                    className="removeBtn"
                    type="button"
                    onClick={() => handleRemoveDay(dayIndex)}
                  >
                    Remove Day
                  </button>
                </div>
                {day.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="event-panel">
                    <div className="event-row">
                      {/* <label>Event Type:</label> */}
                      <div className="event-input">
                        <span>
                          {event.type === "site" && (
                            <BeachAccessIcon className="event-icon" />
                          )}
                          {event.type === "hotel" && (
                            <HotelIcon className="event-icon" />
                          )}
                          {event.type === "restaurant" && (
                            <LocalDiningIcon className="event-icon" />
                          )}
                          {event.type === "transport" && (
                            <CommuteIcon className="event-icon" />
                          )}
                        </span>
                      </div>
                    </div>
                    {event.type === "site" && (
                      <div className="event-row">
                        <label>Site:</label>
                        <Select
                          options={sites.map((site) => ({
                            value: site._id,
                            label: site.name,
                          }))}
                          onChange={(selectedOption) =>
                            handleEventChange(
                              dayIndex,
                              eventIndex,
                              "siteRef",
                              selectedOption.value
                            )
                          }
                          value={
                            sites
                              .map((site) => ({
                                value: site._id,
                                label: site.name,
                              }))
                              .find(
                                (option) => option.value === event.siteRef
                              ) || null
                          }
                        />
                      </div>
                    )}
                    {event.type === "restaurant" && (
                      <div className="event-row">
                        <label>Restaurant:</label>
                        <Select
                          options={restaurants.map((restaurant) => ({
                            value: restaurant._id,
                            label: restaurant.name,
                          }))}
                          onChange={(selectedOption) =>
                            handleEventChange(
                              dayIndex,
                              eventIndex,
                              "restaurantRef",
                              selectedOption.value
                            )
                          }
                          value={
                            restaurants
                              .map((restaurant) => ({
                                value: restaurant._id,
                                label: restaurant.name,
                              }))
                              .find(
                                (option) => option.value === event.restaurantRef
                              ) || null
                          }
                        />
                        <div className="event-row">
                          <label>Meal Type:</label>
                          <select
                            value={event.mealType || ""}
                            onChange={(e) =>
                              handleEventChange(
                                dayIndex,
                                eventIndex,
                                "mealType",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Meal</option>
                            {restaurants
                              ?.find(
                                (option) => option._id === event.restaurantRef
                              )
                              ?.availableMeals.map((meal) => (
                                <option key={meal} value={meal}>
                                  {meal}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    )}
                    {event.type === "hotel" && (
                      <div className="event-row">
                        <label>Hotel:</label>
                        <Select
                          options={hotels.map((hotel) => ({
                            value: hotel._id,
                            label: hotel.name,
                          }))}
                          onChange={(selectedOption) =>
                            handleEventChange(
                              dayIndex,
                              eventIndex,
                              "hotelRef",
                              selectedOption.value
                            )
                          }
                          value={
                            hotels
                              .map((hotel) => ({
                                value: hotel._id,
                                label: hotel.name,
                              }))
                              .find(
                                (option) => option.value === event.hotelRef
                              ) || null
                          }
                        />
                        <div className="event-row">
                          <label>Room Type:</label>
                          <select
                            value={event.roomType || ""}
                            onChange={(e) =>
                              handleEventChange(
                                dayIndex,
                                eventIndex,
                                "roomType",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Room Type</option>
                            {hotels
                              ?.find((option) => option._id === event.hotelRef)
                              ?.availableRoomTypes.map((roomType) => (
                                <option key={roomType} value={roomType}>
                                  {roomType}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="event-row">
                          <label>Meal Plan:</label>
                          <select
                            value={event.mealPlan || ""}
                            onChange={(e) =>
                              handleEventChange(
                                dayIndex,
                                eventIndex,
                                "mealPlan",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Meal Plan</option>
                            {hotels
                              ?.find((option) => option._id === event.hotelRef)
                              ?.availableMealPlans.map((mealPlan) => (
                                <option key={mealPlan} value={mealPlan}>
                                  {mealPlan}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    )}
                    {event.type === "transport" && (
                      <div className="event-row">
                        <label>Transport:</label>
                        <Select
                          options={transports.map((transport) => ({
                            value: transport._id,
                            label:
                              transport.modeOfTransport +
                              " | " +
                              transport.company,
                          }))}
                          onChange={(selectedOption) =>
                            handleEventChange(
                              dayIndex,
                              eventIndex,
                              "transportRef",
                              selectedOption.value
                            )
                          }
                          value={
                            transports
                              .map((transport) => ({
                                value: transport._id,
                                label:
                                  transport.modeOfTransport +
                                  " | " +
                                  transport.company,
                              }))
                              .find(
                                (option) => option.value === event.transportRef
                              ) || null
                          }
                        />
                        <div className="event-row">
                          <label>From:</label>
                          <input
                            type="text"
                            value={event.from || ""}
                            onChange={(e) =>
                              handleEventChange(
                                dayIndex,
                                eventIndex,
                                "from",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="event-row">
                          <label>To:</label>
                          <input
                            type="text"
                            value={event.to || ""}
                            onChange={(e) =>
                              handleEventChange(
                                dayIndex,
                                eventIndex,
                                "to",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="event-row">
                          <label>Distance:</label>
                          <input
                            min={0}
                            type="number"
                            value={event.distance || ""}
                            onChange={(e) =>
                              handleEventChange(
                                dayIndex,
                                eventIndex,
                                "distance",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    )}
                    <div className="event-row">
                      <label>Start Time:</label>
                      <input
                        type="time"
                        onChange={(e) =>
                          handleEventChange(
                            dayIndex,
                            eventIndex,
                            "startTime",
                            e.target.value
                          )
                        }
                        value={event.startTime}
                        disabled={eventIndex != 0 ? true : false}
                      />
                      <label>End Time:</label>
                      <input
                        type="time"
                        onChange={(e) =>
                          handleEventChange(
                            dayIndex,
                            eventIndex,
                            "endTime",
                            e.target.value
                          )
                        }
                        value={event.endTime}
                        disabled
                      />
                    </div>
                    <div className="event-row">
                      <label>Duration:</label>
                      <input
                        type="number"
                        onChange={(e) =>
                          handleEventChange(
                            dayIndex,
                            eventIndex,
                            "duration",
                            e.target.value
                          )
                        }
                        value={event.duration}
                      />
                    </div>
                    <div className="btn-column">
                      <button
                        type="button"
                        onClick={() => handleMoveUpEvent(dayIndex, eventIndex)}
                      >
                        <ArrowUpwardIcon />
                      </button>
                      <button
                        // className="removeBtn"
                        type="button"
                        onClick={() => handleRemoveEvent(dayIndex, eventIndex)}
                      >
                        <DeleteIcon />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleMoveDownEvent(dayIndex, eventIndex)
                        }
                      >
                        <ArrowDownwardIcon />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="row">
                  <button
                    type="button"
                    onClick={() => handleAddEvent(dayIndex, "site")}
                  >
                    Add Site Event
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddEvent(dayIndex, "restaurant")}
                  >
                    Add Restaurant Event
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddEvent(dayIndex, "hotel")}
                  >
                    Add Hotel Event
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddEvent(dayIndex, "transport")}
                  >
                    Add Transportation Event
                  </button>
                </div>
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>

      <div className="field-group">
        <button type="button" onClick={handleAddDay}>
          Add Day
        </button>
      </div>

      <div className="field-group">
        <label>Inclusions:</label>
        {formData.inclusions?.map((item, index) => (
          <div key={index} className="item-field">
            <input
              type="text"
              value={item}
              onChange={(e) => handleInclusionChange(index, e.target.value)}
              className={emptyFields.includes("inclusions") ? "error" : ""}
            />
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemoveInclusion(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddInclusion}>
          Add Inclusion
        </button>
      </div>

      <div className="field-group">
        <label>Exclusions:</label>
        {formData.exclusions?.map((item, index) => (
          <div key={index} className="item-field">
            <input
              type="text"
              value={item}
              onChange={(e) => handleExclusionChange(index, e.target.value)}
              className={emptyFields.includes("exclusions") ? "error" : ""}
            />
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemoveExclusion(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddExclusion}>
          Add Exclusion
        </button>
      </div>

      <div className="field-group">
        <label>Terms and Conditions:</label>
        {formData.tandcs?.map((item, index) => (
          <div key={index} className="item-field">
            <input
              type="text"
              value={item}
              onChange={(e) => handleTandCChange(index, e.target.value)}
              className={emptyFields.includes("tandcs") ? "error" : ""}
            />
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemoveTandC(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddTandC}>
          Add Terms and Conditions
        </button>
      </div>

      <div className="field-group">
        <label>Disclaimers:</label>
        {formData.disclaimers?.map((item, index) => (
          <div key={index} className="item-field">
            <input
              type="text"
              value={item}
              onChange={(e) => handleDisclaimerChange(index, e.target.value)}
              className={emptyFields.includes("disclaimers") ? "error" : ""}
            />
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemoveDisclaimer(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddDisclaimer}>
          Add Disclaimer
        </button>
      </div>

      <div className="form-actions">
        <button type="submit">Save Itinerary</button>
        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
};

export default ItineraryCreateForm;
