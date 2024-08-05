import { useState, useEffect, useContext } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SiteContext } from "../../context/SiteContext";
import "../../styles/form.css";

const SiteEditForm = ({ siteID }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { sites, dispatch } = useContext(SiteContext);

  const API_URL = process.env.REACT_APP_API_URL;

  const initialFormData = {
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    duration: 0,
    type: "",
  };

  const typeOptions = [
    "Tourist",
    "Historical",
    "Business",
    "Recreational",
    "Religious",
  ];
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    const fetchSite = async () => {
      if (!user) {
        setError("You must be logged in");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/site/${siteID}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setFormData(response.data);
      } catch (error) {
        setError(error.response?.data?.error || "An error occurred");
      }
    };

    fetchSite();
  }, [siteID, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name.includes("visitingHours.")) {
      const timeType = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        visitingHours: {
          ...prevFormData.visitingHours,
          [timeType]: newValue,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
    }
  };

  const handleFacilityChange = (index, value) => {
    const newFacilities = [...formData?.facilities];
    newFacilities[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      facilities: newFacilities,
    }));
  };

  const handleAddFacility = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      facilities: [...prevFormData.facilities, ""],
    }));
  };

  const handleRemoveFacility = (index) => {
    const newFacilities = formData?.facilities.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      facilities: newFacilities,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const requiredFields = [
      "name",
      "address",
      "city",
      "state",
      "country",
      "pincode",
      "type",
      "visitingHours.start",
      "visitingHours.end",
    ];

    const missingFields = requiredFields.filter((field) => {
      const [mainField, subField] = field.split(".");
      return subField ? !formData[mainField][subField] : !formData[mainField];
    });

    if (missingFields.length > 0) {
      setEmptyFields(missingFields);
      setError("Please fill in all the required fields");
      console.log(missingFields);
      return;
    }

    try {
      const response = await axios.patch(
        `${API_URL}/api/site/${siteID}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setError(null);
      setEmptyFields([]);
      console.log("Site updated", response.data);

      dispatch({ type: "UPDATE_SITE", payload: response.data });

      navigate(`/operations/site/view/${siteID}`);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
      setEmptyFields(error.response?.data?.emptyFields || []);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Edit Site</h3>

      <div className="row">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData?.name}
            className={emptyFields.includes("name") ? "error" : ""}
          />
        </div>
      </div>
      <div className="row">
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            value={formData?.address}
            className={emptyFields.includes("address") ? "error" : ""}
          />
        </div>

        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            value={formData?.city}
            className={emptyFields.includes("city") ? "error" : ""}
          />
        </div>
      </div>
      <div className="row">
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            onChange={handleChange}
            value={formData?.state}
            className={emptyFields.includes("state") ? "error" : ""}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            onChange={handleChange}
            value={formData?.country}
            className={emptyFields.includes("country") ? "error" : ""}
          />
        </div>
      </div>
      <div>
        <label>Pincode:</label>
        <input
          type="text"
          name="pincode"
          onChange={handleChange}
          value={formData?.pincode}
          className={emptyFields.includes("pincode") ? "error" : ""}
        />
      </div>
      <div className="row">
        <div>
          <label>Type:</label>
          <select
            name="type"
            onChange={handleChange}
            value={formData?.type}
            className={emptyFields.includes("type") ? "error" : ""}
          >
            <option key={""} value={""}>
              {""}
            </option>
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          onChange={handleChange}
          value={formData?.description}
          className={emptyFields.includes("description") ? "error" : ""}
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type="text"
          name="image"
          onChange={handleChange}
          value={formData?.image}
        />
      </div>
      <div className="row">
        <div>
          <label>Visiting Hours Start:</label>
          <input
            type="time"
            name="visitingHours.start"
            onChange={handleChange}
            value={formData?.visitingHours?.start}
            className={
              emptyFields.includes("visitingHours.start") ? "error" : ""
            }
          />
        </div>
        <div>
          <label>Visiting Hours End:</label>
          <input
            type="time"
            name="visitingHours.end"
            onChange={handleChange}
            value={formData?.visitingHours?.end}
            className={emptyFields.includes("visitingHours.end") ? "error" : ""}
          />
        </div>
      </div>
      <div>
        <label>Facilities:</label>
        {formData?.facilities?.map((item, index) => (
          <div key={index} className="destination-field">
            <input
              type="text"
              value={item}
              onChange={(e) => handleFacilityChange(index, e.target.value)}
              className={emptyFields.includes("facilities") ? "error" : ""}
            />
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemoveFacility(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="addFacilityBtn"
          type="button"
          style={{ marginBottom: "20px" }}
          onClick={handleAddFacility}
        >
          Add Facility
        </button>
      </div>
      <div className="submitBtn">
        <button type="submit">Update Site</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SiteEditForm;
