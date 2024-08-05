import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/form.css";
import EnquiryDetails from "../enquiry/EnquiryDetails";
import deleteBtn from "../../assets/delete.png";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

const ItineraryEditForm = ({ enquiry }) => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const hotelSelectRef = useRef();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState(null);
  const [sites, setSites] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [transports, setTransports] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setError("You must be logged in");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/itinerary/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setFormData(data);
        } else {
          setError(data.error);
        }

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
  }, [user, id, API_URL]);

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
          events: [
            {
              type: "site",
              site: "",
              hotelRef: "",
              transportRef: "",
              restaurantRef: "",
              duration: 0,
              startTime: "",
              endTime: "",
            },
          ],
        },
      ],
    }));
  };

  const handleAddEvent = (dayIndex) => {
    const newDays = [...formData.days];
    newDays[dayIndex].events.push({
      type: "site",
      site: "",
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

    const response = await fetch(`${API_URL}/api/itinerary/${id}`, {
      method: "PATCH",
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
    } else {
      setFormData(null);
      setError(null);
      setEmptyFields([]);
      navigate(`/operations/itinerary/view/${id}`);
      console.log("Itinerary updated", json);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Edit Itinerary</h3>

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
        {formData.days.map((day, dayIndex) => (
          <div key={dayIndex}>
            <div className="row">
              <label>Day {dayIndex + 1}:</label>
              <button type="button" onClick={() => handleRemoveDay(dayIndex)}>
                Remove Day
              </button>
            </div>
            {day.events.map((event, eventIndex) => (
              <div key={eventIndex} style={{ display: "flex", gap: "10px" }}>
                {/* <div>
                  <label>Event Type:</label>
                  <select
                    value={event.type}
                    onChange={(e) =>
                      handleEventChange(
                        dayIndex,
                        eventIndex,
                        "type",
                        e.target.value
                      )
                    }
                    className={emptyFields.includes("type") ? "error" : ""}
                  >
                    <option value="site">Site</option>
                    <option value="transport">Transport</option>
                    <option value="hotel">Hotel</option>
                    <option value="restaurant">Restaurant</option>
                  </select>
                </div> */}

                {event.type === "site" && (
                  <div>
                    <label>Site:</label>
                    <Select
                      defaultValue={sites.find(
                        (s) => s._id === event.siteRef
                      )?.name}
                      onChange={(selectedOption) =>
                        handleEventChange(
                          dayIndex,
                          eventIndex,
                          "siteRef",
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      options={sites.map((s) => ({
                        value: s._id,
                        label: s.name,
                      }))}
                      isClearable
                      className={emptyFields.includes("site") ? "error" : ""}
                    />
                  </div>
                )}

                {event.type === "transport" && (
                  <>
                    <div>
                      <label>Transport:</label>
                      <Select
                        defaultValue={event.transportRef.modeOfTransport}
                        onChange={(selectedOption) =>
                          handleEventChange(
                            dayIndex,
                            eventIndex,
                            "transportRef",
                            selectedOption ? selectedOption.value : ""
                          )
                        }
                        options={transports.map((t) => ({
                          value: t,
                          label: t.modeOfTransport,
                        }))}
                        isClearable
                        className={
                          emptyFields.includes("transportRef") ? "error" : ""
                        }
                      />
                    </div>
                    <div>
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
                        className={emptyFields.includes("from") ? "error" : ""}
                      />
                    </div>
                    <div>
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
                        className={emptyFields.includes("to") ? "error" : ""}
                      />
                    </div>
                    <div>
                      <label>Distance (km):</label>
                      <input
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
                        className={
                          emptyFields.includes("distance") ? "error" : ""
                        }
                      />
                    </div>
                  </>
                )}

                {event.type === "hotel" && (
                  <>
                    <div>
                      <label>Hotel:</label>
                      <Select
                        ref={hotelSelectRef}
                        // inputValue={event.hotelRef.name}
                        onChange={(selectedOption) =>
                          handleEventChange(
                            dayIndex,
                            eventIndex,
                            "hotelRef",
                            selectedOption ? selectedOption.value : ""
                          )
                        }
                        options={hotels.map((h) => ({
                          value: h._id,
                          label: h.name,
                        }))}
                        isClearable
                        className={emptyFields.includes("hotel") ? "error" : ""}
                      />
                    </div>
                    <div>
                      <label>Room Type: </label>
                      <select
                        value={hotels ? event.roomType : null}
                        onChange={(e) =>
                          handleEventChange(
                            dayIndex,
                            eventIndex,
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
                          ?.filter((h) => h._id === event?.hotelRef)[0]
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
                        value={event.mealPlan}
                        onChange={(e) =>
                          handleEventChange(
                            dayIndex,
                            eventIndex,
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
                          ?.filter((h) => h._id === event?.hotelRef)[0]
                          ?.availableMealPlans?.map((roomOption) => (
                            <option key={roomOption} value={roomOption}>
                              {roomOption}
                            </option>
                          ))}
                      </select>
                    </div>
                  </>
                )}

                {event.type === "restaurant" && (
                  <>
                    <div>
                      <label>Restaurant:</label>
                      <Select
                        onChange={(selectedOption) =>
                          handleEventChange(
                            dayIndex,
                            eventIndex,
                            "restaurantRef",
                            selectedOption ? selectedOption.value : ""
                          )
                        }
                        options={restaurants.map((r) => ({
                          value: r._id,
                          label: r.name,
                        }))}
                        isClearable
                        className={
                          emptyFields.includes("restaurant") ? "error" : ""
                        }
                      />
                    </div>
                    <div>
                      <label>Meal:</label>
                      <select
                        value={event.mealType}
                        onChange={(e) =>
                          handleEventChange(
                            dayIndex,
                            eventIndex,
                            "mealType",
                            e.target.value
                          )
                        }
                        className={
                          emptyFields.includes("mealType") ? "error" : ""
                        }
                      >
                        {event?.restaurantRef?.availableMeals}
                        <option value="">Select Meal</option>
                        {restaurants
                          ?.filter((r) => r._id === event?.restaurantRef)[0]
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
                  </>
                )}

                <div>
                  <label>Duration (hours):</label>
                  <input
                    type="number"
                    value={event.duration || ""}
                    onChange={(e) =>
                      handleEventChange(
                        dayIndex,
                        eventIndex,
                        "duration",
                        e.target.value
                      )
                    }
                    className={emptyFields.includes("duration") ? "error" : ""}
                  />
                </div>
                <div>
                  <label>Start Time:</label>
                  <input
                    type="time"
                    value={event.startTime || ""}
                    onChange={(e) =>
                      handleEventChange(
                        dayIndex,
                        eventIndex,
                        "startTime",
                        e.target.value
                      )
                    }
                    className={emptyFields.includes("startTime") ? "error" : ""}
                  />
                </div>
                <div>
                  <label>End Time:</label>
                  <input
                    type="time"
                    value={event.endTime || ""}
                    onChange={(e) =>
                      handleEventChange(
                        dayIndex,
                        eventIndex,
                        "endTime",
                        e.target.value
                      )
                    }
                    className={emptyFields.includes("endTime") ? "error" : ""}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveEvent(dayIndex, eventIndex)}
                >
                  <img src={deleteBtn} alt="Delete" />
                </button>
              </div>
            ))}
            <div className="row">
              <button
                type="button"
                onClick={() => handleAddEvent(dayIndex, "site")}
              >
                Add Site
              </button>
              <button
                type="button"
                onClick={() => handleAddEvent(dayIndex, "hotel")}
              >
                Add Hotel
              </button>
              <button
                type="button"
                onClick={() => handleAddEvent(dayIndex, "restaurant")}
              >
                Add Restaurant
              </button>
              <button
                type="button"
                onClick={() => handleAddEvent(dayIndex, "transport")}
              >
                Add Transport
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddDay}>
          Add Day
        </button>
      </div>

      <div className="submitBtn">
        <button type="submit">Edit Itinerary</button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ItineraryEditForm;
