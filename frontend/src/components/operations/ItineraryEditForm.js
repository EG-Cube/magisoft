import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/form.css";

const ItineraryEditForm = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState(null);
  const [sites, setSites] = useState([]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    const fetchItinerary = async () => {
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
      } catch (err) {
        setError("Failed to fetch itinerary");
      }
    };

    const fetchSites = async () => {
      if (!user) {
        setError("You must be logged in");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/site`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setSites(data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to fetch sites");
      }
    };

    fetchItinerary();
    fetchSites();
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

  const handleSiteChange = (dayIndex, siteIndex, value) => {
    const newDays = [...formData.days];
    newDays[dayIndex].sites[siteIndex] = value;
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
          sites: [""],
        },
      ],
    }));
  };

  const handleAddSite = (dayIndex) => {
    const newDays = [...formData.days];
    newDays[dayIndex].sites.push("");
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

  const handleRemoveSite = (dayIndex, siteIndex) => {
    const newDays = [...formData.days];
    newDays[dayIndex].sites = newDays[dayIndex].sites.filter(
      (_, i) => i !== siteIndex
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
              <button
                type="button"
                onClick={() => handleRemoveDay(dayIndex)}
              >
                Remove Day
              </button>
            </div>
            <div className="row">
              {sites && day.sites.map((site, siteIndex) => (
                <div key={siteIndex} className="destination-field">
                  <label>Site:</label>
                  <select
                    value={site._id}
                    onChange={(e) =>
                      handleSiteChange(dayIndex, siteIndex, e.target.value)
                    }
                    className={emptyFields.includes("sites") ? "error" : ""}
                  >
                    <option value="">Select a site</option>
                    {sites.map((siteOption) => (
                      <option key={siteOption._id} value={siteOption._id}>
                        {siteOption.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveSite(dayIndex, siteIndex)
                    }
                  >
                    Remove Site
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddSite(dayIndex)}
              >
                Add Site
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddDay}>
          Add Day
        </button>
      </div>

      <div className="submitBtn">
        <button type="submit">Update Itinerary</button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ItineraryEditForm;
