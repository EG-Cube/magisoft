import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/form.css";
import EnquiryDetails from "../enquiry/EnquiryDetails";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

const ItineraryEditForm = ({ enquiry }) => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState(null);
  const [sites, setSites] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [transports, setTransports] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setError("You must be logged in");
        return;
      }

      try {
        const [
          itineraryResponse,
          sitesResponse,
          hotelsResponse,
          transportsResponse,
          restaurantsResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/api/itinerary/${id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }),
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

        const [
          itineraryData,
          sitesData,
          hotelsData,
          transportsData,
          restaurantsData,
        ] = await Promise.all([
          itineraryResponse.json(),
          sitesResponse.json(),
          hotelsResponse.json(),
          transportsResponse.json(),
          restaurantsResponse.json(),
        ]);

        console.log(itineraryData); // Check the initial data
        console.log(itineraryData?.days); // Check the days array

        const updatedItinerayData = {
          ...itineraryData,
          days: itineraryData?.days?.map((day) => {
            console.log(day); // Check each day object
            return {
              ...day,
              events: day?.events?.map((event) => {
                console.log(event); // Check each event object
                return {
                  ...event,
                  siteRef: event.siteRef?._id,
                  hotelRef: event.hotelRef?._id,
                  transportRef: event.transportRef?._id,
                  restaurantRef: event.restaurantRef?._id,
                };
              }),
            };
          }),
        }

        if (itineraryResponse.ok)
          setFormData(updatedItinerayData);
        if (sitesResponse.ok) setSites(sitesData);
        if (hotelsResponse.ok) setHotels(hotelsData);
        if (transportsResponse.ok) setTransports(transportsData);
        if (restaurantsResponse.ok) setRestaurants(restaurantsData);
        setLoading(false)
      } catch (err) {
        console.log(err)
        setError("Failed to fetch data ");
      }
    };

    fetchData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEventChange = (dayIndex, eventIndex, field, value) => {
    const newDays = [...formData?.days];
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
              siteRef: "",
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

  const handleAddEvent = (dayIndex, eventType) => {
    const newDays = [...formData?.days];
    newDays[dayIndex].events.push({
      type: eventType,
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
    const newDays = formData?.days.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      days: newDays,
    }));
  };

  const handleRemoveEvent = (dayIndex, eventIndex) => {
    const newDays = [...formData?.days];
    newDays[dayIndex].events = newDays[dayIndex].events.filter(
      (_, i) => i !== eventIndex
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      days: newDays,
    }));
  };

  
  const handleInclusionChange = (index, value) => {
    const newInclusions = [...formData?.inclusions];
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
    const newInclusions = formData?.inclusions.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      inclusions: newInclusions,
    }));
  };

  const handleExclusionChange = (index, value) => {
    const newExclusions = [...formData?.exclusions];
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
    const newExclusions = formData?.exclusions.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      exclusions: newExclusions,
    }));
  };

  const handleTandCChange = (index, value) => {
    const newTandCs = [...formData?.tandcs];
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
    const newTandCs = formData?.tandcs.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      tandcs: newTandCs,
    }));
  };

  const handleDisclaimerChange = (index, value) => {
    const newDisclaimers = [...formData?.disclaimers];
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
    const newDisclaimers = formData?.disclaimers.filter((_, i) => i !== index);
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

  // if (!loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    
    <form className="form" onSubmit={handleSubmit}>
      <h3>Edit Itinerary</h3>

      {enquiry && <EnquiryDetails enquiry={enquiry} />}

      {/* {formData ? <></> : <p>Loading...</p>} */}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData?.name || ""}
          className={emptyFields.includes("name") ? "error" : ""}
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          onChange={handleChange}
          value={formData?.description || ""}
        />
      </div>

      <div>
        <label>Days:</label>
        <Tabs>
          <TabList>
            {formData?.days.map((day, index) => (
              <Tab key={index}>Day {index + 1}</Tab>
            ))}
          </TabList>

          {formData?.days.map((day, dayIndex) => (
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
                    <span>{event.type}</span>
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
                        <label>Site: </label>
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
                              selectedOption ? selectedOption.value : ""
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
                    </div>
                  )}
                  {event.type === "restaurant" && (
                    <div className="row">
                      <div>
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
                              selectedOption ? selectedOption.value : ""
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
                      </div>
                      <div>
                        <label>Meal Type: </label>
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
                    <div className="row">
                      <div>
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
                              selectedOption ? selectedOption.value : ""
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

                        <label>Room Type: </label>
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
                          <option value={""}>Select Room Type</option>
                          {hotels
                            ?.find((option) => option._id === event.hotelRef)
                            ?.availableRoomTypes.map((roomType) => (
                              <option key={roomType} value={roomType}>
                                {roomType}
                              </option>
                            ))}
                        </select>

                        <label>Meal Plan: </label>
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
                          <option value={""}>Select Meal Plan</option>
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
                    <div className="row">
                      <div>
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
                              selectedOption ? selectedOption.value : ""
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

                        <label>From: </label>
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

                        <label>To: </label>
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

                        <label>Distance: </label>
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
                  <div className="row">
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
                      value={event.startTime || ""}
                    />
                  </div>
                  <div className="row">
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
                      value={event.endTime || ""}
                    />
                  </div>
                  <div className="row">
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
                      value={event.duration || ""}
                    />
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
            </TabPanel>
          ))}
        </Tabs>
      </div>

      <div className="row">
        <button type="button" onClick={handleAddDay}>
          Add Day
        </button>
      </div>

      
      <div>
        <label>Inclusions:</label>
        {formData?.inclusions?.map((item, index) => (
          <div key={index} className="inclusion-field">
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

      <div>
        <label>Exclusions:</label>
        {formData?.exclusions?.map((item, index) => (
          <div key={index} className="exclusion-field">
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

      <div>
        <label>Terms and Conditions:</label>
        {formData?.tandcs?.map((item, index) => (
          <div key={index} className="tandcs-field">
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

      <div>
        <label>Disclaimers:</label>
        {formData?.disclaimers?.map((item, index) => (
          <div key={index} className="disclaimers-field">
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

      <button type="submit">Update Itinerary</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ItineraryEditForm;
