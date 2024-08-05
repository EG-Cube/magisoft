import { useState, useEffect, useContext } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RestaurantContext } from "../../context/RestaurantContext";
import "../../styles/form.css";

const RestaurantEditForm = ({ restaurantID }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { dispatch } = useContext(RestaurantContext);

  const API_URL = process.env.REACT_APP_API_URL;

  const initialFormData = {
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    contactNumber: "",
    email: "",
    website: "",
    availableMeals: [],
    amenities: [],
    cuisine: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!user) {
        setError("You must be logged in");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/restaurant/${restaurantID}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setFormData(response.data);
      } catch (error) {
        setError(error.response?.data?.error || "An error occurred");
      }
    };

    fetchRestaurant();
  }, [restaurantID, user, API_URL]); // Added API_URL to the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAvailableMealsChange = (index, value) => {
    const newMeals = [...formData.availableMeals];
    newMeals[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      availableMeals: newMeals,
    }));
  };

  const handleAddMeal = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      availableMeals: [...prevFormData.availableMeals, ""],
    }));
  };

  const handleRemoveMeal = (index) => {
    const newMeals = formData.availableMeals.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      availableMeals: newMeals,
    }));
  };

  const handleAmenitiesChange = (index, value) => {
    const newAmenities = [...formData.amenities];
    newAmenities[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      amenities: newAmenities,
    }));
  };

  const handleAddAmenity = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      amenities: [...prevFormData.amenities, ""],
    }));
  };

  const handleRemoveAmenity = (index) => {
    const newAmenities = formData.amenities.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      amenities: newAmenities,
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
      "contactNumber",
      "cuisine",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setEmptyFields(missingFields);
      setError("Please fill in all the required fields");
      return;
    }

    try {
      const response = await axios.patch(
        `${API_URL}/api/restaurant/${restaurantID}`,
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
      console.log("Restaurant updated", response.data);

      dispatch({ type: "UPDATE_RESTAURANT", payload: response.data });

      navigate(`/operations/restaurant/view/${restaurantID}`);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
      setEmptyFields(error.response?.data?.emptyFields || []);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Edit Restaurant</h3>

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
        />
      </div>
      <div>
        <label>Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          onChange={handleChange}
          value={formData.contactNumber}
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
        <label>Cuisine:</label>
        <input
          type="text"
          name="cuisine"
          onChange={handleChange}
          value={formData.cuisine}
          className={emptyFields.includes("cuisine") ? "error" : ""}
        />
      </div>
      <div>
        <label>Available Meals:</label>
        {formData.availableMeals.map((meal, index) => (
          <div key={index} className="destination-field">
            <input
              type="text"
              value={meal}
              onChange={(e) => handleAvailableMealsChange(index, e.target.value)}
            />
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemoveMeal(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="addFacilityBtn"
          type="button"
          style={{ marginBottom: "20px" }}
          onClick={handleAddMeal}
        >
          Add Meal
        </button>
      </div>
      <div>
        <label>Amenities:</label>
        {formData.amenities.map((amenity, index) => (
          <div key={index} className="destination-field">
            <input
              type="text"
              value={amenity}
              onChange={(e) => handleAmenitiesChange(index, e.target.value)}
            />
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemoveAmenity(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="addFacilityBtn"
          type="button"
          style={{ marginBottom: "20px" }}
          onClick={handleAddAmenity}
        >
          Add Amenity
        </button>
      </div>
      <div className="submitBtn">
        <button type="submit">Update Restaurant</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default RestaurantEditForm;
