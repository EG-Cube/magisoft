import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/form.css";

const RestaurantCreateForm = () => {
  const { user } = useAuthContext();

  const API_URL = process.env.REACT_APP_API_URL;

  const initialFormData = {
    name: "",
    cuisine: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    contactNumber: "",
    email: "",
    website: "",
    availableMeals: [""],
    amenities: [""],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
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
      "cuisine",
      "address",
      "city",
      "state",
      "country",
      "contactNumber",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setEmptyFields(missingFields);
      setError("Please fill in all the required fields");
      return;
    }

    // Check if email format is valid if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please provide a valid email address");
      return;
    }

    const response = await fetch(`${API_URL}/api/restaurant`, {
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
      console.log("New restaurant added", json);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a New Restaurant</h3>

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
          <label>Cuisine:</label>
          <input
            type="text"
            name="cuisine"
            onChange={handleChange}
            value={formData.cuisine}
            className={emptyFields.includes("cuisine") ? "error" : ""}
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
        />
      </div>
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
        />
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
        <label>Available Meals:</label>
        {formData.availableMeals.map((item, index) => (
          <div key={index} className="destination-field">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, "availableMeals")
              }
              className={emptyFields.includes("availableMeals") ? "error" : ""}
            />
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemoveField(index, "availableMeals")}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="addFacilityBtn"
          type="button"
          style={{ marginBottom: "20px" }}
          onClick={() => handleAddField("availableMeals")}
        >
          Add Meal
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
        <button type="submit">Add Restaurant</button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default RestaurantCreateForm;
