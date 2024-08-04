import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/form.css";
import EnquiryDetails from "../enquiry/EnquiryDetails";
import deleteBtn from "../../assets/delete.png";
import Select from "react-select";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ItineraryCreateForm = ({ enquiry }) => {
  const { user } = useAuthContext();
  const API_URL = process.env.REACT_APP_API_URL;

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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [sites, setSites] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [transports, setTransports] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [newEvent, setNewEvent] = useState({
    type: "site",
    siteRef: "",
    hotelRef: "",
    transportRef: "",
    restaurantRef: "",
    duration: 0,
    startTime: "",
    endTime: "",
  });
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
    });
  }, [enquiry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDayChange = (index, value) => {
    const newDays = [...formData.days];
    newDays[index].day = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      days: newDays,
    }));
  };

  const handleEventChange = (dayIndex, eventIndex, field, value) => {
    const newDays = [...formData.days];
    newDays[dayIndex].events[eventIndex][field] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      days: newDays,
    }));
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

  const handleAddEvent = (dayIndex) => {
    const newDays = [...formData.days];

    newDays[dayIndex].events.push({
      type: "site",
      siteRef: "",
      hotelRef: "",
      transportRef: "",
      restaurantRef: "",
      duration: 0,
      startTime: "",
      endTime: "",
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      days: newDays,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const requiredFields = ["name", "days"];

    const missingFields = requiredFields.filter(
      (field) => !formData[field] || formData[field].length === 0
    );

    if (missingFields.length > 0) {
      setEmptyFields(missingFields);
      setError("Please fill in all the required fields");
      return;
    }

    const response = await fetch(`${API_URL}/api/itinerary`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });

    const json = await response.json();

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
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a New Itinerary</h3>

      {enquiry && <EnquiryDetails enquiry={enquiry} />}

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          className={emptyFields.includes("name") ? "error" : ""}
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          onChange={handleChange}
          value={formData.description}
        />
      </div>

      <div>
        <label>Days:</label>
        <Tabs>
          <TabList>
            {formData.days.map((day, index) => (
              <Tab key={index}>Day {index + 1}</Tab>
            ))}
          </TabList>

          {formData.days.map((day, dayIndex) => (
            <TabPanel key={dayIndex}>
              <div className="row">
                <label>Day {dayIndex + 1}:</label>
                <button type="button" onClick={() => handleRemoveDay(dayIndex)}>
                  Remove Day
                </button>
              </div>
              {day.events.map((event, eventIndex) => (
                <div key={eventIndex} style={{ marginBottom: "1rem" }}>
                  <div className="row">
                    <label>Event Type:</label>
                    <Select
                      options={[
                        { value: "site", label: "Site" },
                        { value: "hotel", label: "Hotel" },
                        { value: "restaurant", label: "Restaurant" },
                        { value: "transport", label: "Transport" },
                      ]}
                      value={{ value: event.type, label: event.type }}
                      onChange={(selectedOption) =>
                        handleEventChange(
                          dayIndex,
                          eventIndex,
                          "type",
                          selectedOption.value
                        )
                      }
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveEvent(dayIndex, eventIndex)}
                    >
                      Remove Event
                    </button>
                  </div>
                  {event.type === "site" && (
                    <div className="row">
                      <div>
                        <label>Site:</label>
                        <label>{event.siteRef.name}</label>
                      </div>
                    </div>
                  )}
                  {event.type === "hotel" && (
                    <div className="row">
                      <div>
                        <label>Hotel:</label>
                        <label>{event.hotelRef.name}</label>
                      </div>
                      <div>
                        <label>Room Type: </label>
                        <label>{event.roomType}</label>
                      </div>
                      <div>
                        <label>Meal Plan:</label>
                        <label>{event.mealPlan}</label>
                      </div>
                    </div>
                  )}
                  {event.type === "restaurant" && (
                    <div className="row">
                      <div>
                        <label>Restaurant:</label>
                        <label>{event.restaurantRef.name}</label>
                      </div>
                      <div>
                        <label>Meal:</label>
                        <label>{event.mealType}</label>
                      </div>
                    </div>
                  )}
                  {event.type === "transport" && (
                    <div className="row">
                      <div>
                        <label>Transport:</label>
                        <label>{event.transportRef.modeOfTransport}</label>
                      </div>

                      <div>
                        <label>From:</label>
                        <label>{event.from}</label>
                      </div>
                      <div>
                        <label>To:</label>
                        <label>{event.to}</label>
                      </div>
                      <div>
                        <label>Distance (km):</label>
                        <label>{event.distance}</label>
                      </div>
                    </div>
                  )}
                  <div className="row">
                    <label>Duration:</label>
                    <label>{event.duration}</label>
                  </div>
                  <div className="row">
                    <label>Start Time:</label>
                    <label>{event.startTime}</label>
                  </div>
                  <div className="row">
                    <label>End Time:</label>
                    <label>{event.endTime}</label>
                  </div>
                </div>
              ))}
              <div style={{ marginBottom: "1rem" }}>
                <div className="row">
                  <label>Event Type:</label>
                  <Select
                    options={[
                      { value: "site", label: "Site" },
                      { value: "hotel", label: "Hotel" },
                      { value: "restaurant", label: "Restaurant" },
                      { value: "transport", label: "Transport" },
                    ]}
                    value={{ value: newEvent?.type, label: newEvent?.type }}
                    onChange={(selectedOption) =>
                      // handleEventChange(
                      //   dayIndex,
                      //   day.events.length,
                      //   "type",
                      //   selectedOption.value
                      // )
                      setNewEvent((curr) => {
                        curr.type = selectedOption;
                        return curr;
                      })
                    }
                  />
                </div>
                {newEvent?.type === "site" && (
                  <div className="row">
                    <div>
                      <label>Site:</label>
                      <Select
                        options={sites.map((site) => ({
                          value: site._id,
                          label: site.name,
                        }))}
                        value={{
                          value: newEvent?.siteRef,
                          label:
                            sites.find((site) => site._id === newEvent?.siteRef)
                              ?.name || "",
                        }}
                        onChange={(selectedOption) =>
                          handleEventChange(
                            dayIndex,
                            day.events.length,
                            "siteRef",
                            selectedOption.value
                          )
                        }
                      />
                    </div>
                  </div>
                )}
                {newEvent?.type === "hotel" && (
                  <div className="row">
                    <div>
                      <label>Hotel:</label>
                      <Select
                        options={hotels.map((hotel) => ({
                          value: hotel._id,
                          label: hotel.name,
                        }))}
                        value={{
                          value: newEvent?.hotelRef,
                          label:
                            hotels.find(
                              (hotel) => hotel._id === newEvent?.hotelRef
                            )?.name || "",
                        }}
                        onChange={(selectedOption) =>
                          handleEventChange(
                            dayIndex,
                            day.events.length,
                            "hotelRef",
                            selectedOption.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <label>Room Type: </label>
                      <select
                        value={hotels ? newEvent?.roomType : null}
                        onChange={(e) =>
                          handleEventChange(
                            dayIndex,
                            day.events.length,
                            "roomType",
                            e.target.value
                          )
                        }
                        className={
                          emptyFields.includes("roomType") ? "error" : ""
                        }
                      >
                        <option value="">Select Room Type</option>
                        {hotels
                          ?.filter((h) => h._id === newEvent?.hotelRef)[0]
                          ?.availableRoomTypes?.map((roomOption) => (
                            <option key={roomOption} value={roomOption}>
                              {roomOption}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label>Meal Plan:</label>
                      <select
                        value={newEvent?.mealPlan}
                        onChange={(e) =>
                          handleEventChange(
                            dayIndex,
                            day.events.length,
                            "mealPlan",
                            e.target.value
                          )
                        }
                        className={
                          emptyFields.includes("mealPlan") ? "error" : ""
                        }
                      >
                        <option value="">Select Meal Plan</option>
                        {hotels
                          ?.filter((h) => h._id === newEvent?.hotelRef)[0]
                          ?.availableMealPlans?.map((roomOption) => (
                            <option key={roomOption} value={roomOption}>
                              {roomOption}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                )}
                {newEvent?.type === "restaurant" && (
                  <div className="row">
                    <div>
                      <label>Restaurant:</label>
                      <Select
                        options={restaurants.map((restaurant) => ({
                          value: restaurant._id,
                          label: restaurant.name,
                        }))}
                        value={{
                          value: newEvent?.restaurantRef,
                          label:
                            restaurants.find(
                              (restaurant) =>
                                restaurant._id === newEvent?.restaurantRef
                            )?.name || "",
                        }}
                        onChange={(selectedOption) =>
                          handleEventChange(
                            dayIndex,
                            day.events.length,
                            "restaurantRef",
                            selectedOption.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <label>Meal:</label>
                      <select
                        value={newEvent?.mealType}
                        onChange={(e) =>
                          handleEventChange(
                            dayIndex,
                            day.events.length,
                            "mealType",
                            e.target.value
                          )
                        }
                        className={
                          emptyFields.includes("mealType") ? "error" : ""
                        }
                      >
                        <option value="">Select Meal</option>
                        {restaurants
                          ?.filter((r) => r._id === newEvent?.restaurantRef)[0]
                          ?.availableMeals?.map((restaurantOption) => (
                            <option
                              key={restaurantOption}
                              value={restaurantOption}
                            >
                              {restaurantOption}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                )}
                {newEvent?.type === "transport" && (
                  <div className="row">
                    <div>
                      <label>Transport:</label>
                      <Select
                        options={transports.map((transport) => ({
                          value: transport._id,
                          label: transport.name,
                        }))}
                        value={{
                          value: newEvent?.transportRef,
                          label:
                            transports.find(
                              (transport) =>
                                transport._id === newEvent?.transportRef
                            )?.name || "",
                        }}
                        onChange={(selectedOption) =>
                          handleEventChange(
                            dayIndex,
                            day.events.length,
                            "transportRef",
                            selectedOption.value
                          )
                        }
                      />
                    </div>

                    <div>
                      <label>From:</label>
                      <input
                        type="text"
                        value={newEvent?.from || ""}
                        onChange={(e) =>
                          handleEventChange(
                            dayIndex,
                            day.events.length,
                            "from",
                            e.target.value
                          )
                        }
                        className={emptyFields.includes("from") ? "error" : ""}
                      />
                    </div>
                    <div>
                      <label>To:</label>
                      <input
                        type="text"
                        value={newEvent?.to || ""}
                        onChange={(e) =>
                          handleEventChange(
                            dayIndex,
                            day.events.length,
                            "to",
                            e.target.value
                          )
                        }
                        className={emptyFields.includes("to") ? "error" : ""}
                      />
                    </div>
                    <div>
                      <label>Distance (km):</label>
                      <input
                        type="number"
                        value={newEvent?.distance || ""}
                        onChange={(e) =>
                          handleEventChange(
                            dayIndex,
                            day.events.length,
                            "distance",
                            e.target.value
                          )
                        }
                        className={
                          emptyFields.includes("distance") ? "error" : ""
                        }
                      />
                    </div>
                  </div>
                )}
                <div className="row">
                  <label>Duration:</label>
                  <input
                    type="number"
                    name="duration"
                    onChange={(e) =>
                      handleEventChange(
                        dayIndex,
                        day.events.length,
                        "duration",
                        e.target.value
                      )
                    }
                    value={newEvent?.duration}
                  />
                </div>
                <div className="row">
                  <label>Start Time:</label>
                  <input
                    type="time"
                    name="startTime"
                    onChange={(e) =>
                      handleEventChange(
                        dayIndex,
                        day.events.length,
                        "startTime",
                        e.target.value
                      )
                    }
                    value={newEvent?.startTime}
                  />
                </div>
                <div className="row">
                  <label>End Time:</label>
                  <input
                    type="time"
                    name="endTime"
                    onChange={(e) =>
                      handleEventChange(
                        dayIndex,
                        day.events.length,
                        "endTime",
                        e.target.value
                      )
                    }
                    value={newEvent?.endTime}
                  />
                </div>
              </div>
              <button type="button" onClick={() => handleAddEvent(dayIndex)}>
                Add Event
              </button>
            </TabPanel>
          ))}
        </Tabs>
      </div>

      <div>
        <button type="button" onClick={handleAddDay}>
          Add Day
        </button>
      </div>

      <button type="submit">Create Itinerary</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ItineraryCreateForm;
