import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/form.css";

const HotelCreateForm = () => {
  const { user } = useAuthContext();

  const API_URL = process.env.REACT_APP_API_URL;

  const initialFormData = {
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    starRating: 1,
    contactNumber: "",
    email: "",
    website: "",
    availableRoomTypes: [""],
    availableMealPlans: [""],
    amenities: [""],
  };

  const starRatingOptions = [1, 2, 3, 4, 5];

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleArrayChange = (index, value, field) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: newArray,
    }));
  };

  const handleAddField = (field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: [...prevFormData[field], ""],
    }));
  };

  const handleRemoveField = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: newArray,
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
      "starRating",
      "contactNumber",
      "email",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setEmptyFields(missingFields);
      setError("Please fill in all the required fields");
      return;
    }

    const response = await fetch(`${API_URL}/api/hotel`, {
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
    } else {
      setFormData(initialFormData);
      setError(null);
      setEmptyFields([]);
      console.log("New hotel added", json);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a New Hotel</h3>

      <div className="row">
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
      </div>
      <div className="row">
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            value={formData.address}
            className={emptyFields.includes("address") ? "error" : ""}
          />
        </div>

        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            value={formData.city}
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
            value={formData.state}
            className={emptyFields.includes("state") ? "error" : ""}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            onChange={handleChange}
            value={formData.country}
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
          value={formData.pincode}
          className={emptyFields.includes("pincode") ? "error" : ""}
        />
      </div>
      <div className="row">
        <div>
          <label>Star Rating:</label>
          <select
            name="starRating"
            onChange={handleChange}
            value={formData.starRating}
            className={emptyFields.includes("starRating") ? "error" : ""}
          >
            {starRatingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            onChange={handleChange}
            value={formData.contactNumber}
            className={emptyFields.includes("contactNumber") ? "error" : ""}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className={emptyFields.includes("email") ? "error" : ""}
          />
        </div>
      </div>
      <div>
        <label>Website:</label>
        <input
          type="text"
          name="website"
          onChange={handleChange}
          value={formData.website}
        />
      </div>
      <div>
        <label>Available Room Types:</label>
        {formData.availableRoomTypes.map((item, index) => (
          <div key={index} className="destination-field">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, "availableRoomTypes")
              }
              className={emptyFields.includes("availableRoomTypes") ? "error" : ""}
            />
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemoveField(index, "availableRoomTypes")}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="addFacilityBtn"
          type="button"
          style={{ marginBottom: "20px" }}
          onClick={() => handleAddField("availableRoomTypes")}
        >
          Add Room Type
        </button>
      </div>
      <div>
        <label>Available Meal Plans:</label>
        {formData.availableMealPlans.map((item, index) => (
          <div key={index} className="destination-field">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, "availableMealPlans")
              }
              className={emptyFields.includes("availableMealPlans") ? "error" : ""}
            />
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemoveField(index, "availableMealPlans")}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="addFacilityBtn"
          type="button"
          style={{ marginBottom: "20px" }}
          onClick={() => handleAddField("availableMealPlans")}
        >
          Add Meal Plan
        </button>
      </div>
      <div>
        <label>Amenities:</label>
        {formData.amenities.map((item, index) => (
          <div key={index} className="destination-field">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, "amenities")
              }
              className={emptyFields.includes("amenities") ? "error" : ""}
            />
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemoveField(index, "amenities")}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="addFacilityBtn"
          type="button"
          style={{ marginBottom: "20px" }}
          onClick={() => handleAddField("amenities")}
        >
          Add Amenity
        </button>
      </div>

      <div className="submitBtn">
        <button type="submit">Add Hotel</button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default HotelCreateForm;
