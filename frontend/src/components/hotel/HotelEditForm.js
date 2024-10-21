import React, { useState, useEffect, useContext } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HotelContext } from "../../context/HotelContext";
import "../../styles/form.css";
import Spinner from "../Spinner";

const HotelEditForm = ({ hotelID }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { dispatch } = useContext(HotelContext);

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
    availableRoomTypes: [],
    availableMealPlans: [],
    amenities: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!user) {
        setError("You must be logged in");
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(`${API_URL}/api/hotel/${hotelID}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setLoading(false);

        setFormData(response.data);
      } catch (error) {
        setError(error.response?.data?.error || "An error occurred");
      }
    };

    fetchHotel();
  }, [hotelID, user, API_URL]); // Added API_URL to dependency array

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (
      name.includes("availableRoomTypes") ||
      name.includes("availableMealPlans") ||
      name.includes("amenities")
    ) {
      const [key, index] = name.split(".");
      const updatedArray = [...formData[key]];
      updatedArray[index] = newValue;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [key]: updatedArray,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
    }
  };

  const handleArrayChange = (type, index, value) => {
    const updatedArray = [...formData[type]];
    updatedArray[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: updatedArray,
    }));
  };

  const handleAddItem = (type) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: [...prevFormData[type], ""],
    }));
  };

  const handleRemoveItem = (type, index) => {
    const updatedArray = formData[type].filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: updatedArray,
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
      "starRating",
      "contactNumber",
      "email",
      "availableRoomTypes",
      "availableMealPlans",
    ];

    const missingFields = requiredFields.filter(
      (field) =>
        !formData[field] ||
        (Array.isArray(formData[field]) && formData[field].length === 0)
    );

    if (missingFields.length > 0) {
      setEmptyFields(missingFields);
      setError("Please fill in all the required fields");
      return;
    }

    try {
      const response = await axios.patch(
        `${API_URL}/api/hotel/${hotelID}`,
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
      console.log("Hotel updated", response.data);

      dispatch({ type: "UPDATE_HOTEL", payload: response.data });

      navigate(`/operations/hotel/view/${hotelID}`);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
      setEmptyFields(error.response?.data?.emptyFields || []);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <h3>Edit Hotel</h3>

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
          <div>
            <label>Star Rating:</label>
            <input
              type="number"
              name="starRating"
              onChange={handleChange}
              value={formData?.starRating}
              min="1"
              max="5"
              className={emptyFields.includes("starRating") ? "error" : ""}
            />
          </div>
          <div>
            <label>Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              onChange={handleChange}
              value={formData?.contactNumber}
              className={emptyFields.includes("contactNumber") ? "error" : ""}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData?.email}
              className={emptyFields.includes("email") ? "error" : ""}
            />
          </div>
          <div>
            <label>Website:</label>
            <input
              type="text"
              name="website"
              onChange={handleChange}
              value={formData?.website}
            />
          </div>
          <div>
            <label>Available Room Types:</label>
            {formData?.availableRoomTypes?.map((item, index) => (
              <div key={index} className="destination-field">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(
                      "availableRoomTypes",
                      index,
                      e.target.value
                    )
                  }
                  className={
                    emptyFields.includes("availableRoomTypes") ? "error" : ""
                  }
                />
                <button
                  className="removeBtn"
                  type="button"
                  onClick={() => handleRemoveItem("availableRoomTypes", index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="addFacilityBtn"
              type="button"
              style={{ marginBottom: "20px" }}
              onClick={() => handleAddItem("availableRoomTypes")}
            >
              Add Room Type
            </button>
          </div>
          <div>
            <label>Available Meal Plans:</label>
            {formData?.availableMealPlans?.map((item, index) => (
              <div key={index} className="destination-field">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(
                      "availableMealPlans",
                      index,
                      e.target.value
                    )
                  }
                  className={
                    emptyFields.includes("availableMealPlans") ? "error" : ""
                  }
                />
                <button
                  className="removeBtn"
                  type="button"
                  onClick={() => handleRemoveItem("availableMealPlans", index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="addFacilityBtn"
              type="button"
              style={{ marginBottom: "20px" }}
              onClick={() => handleAddItem("availableMealPlans")}
            >
              Add Meal Plan
            </button>
          </div>
          <div>
            <label>Amenities:</label>
            {formData?.amenities?.map((item, index) => (
              <div key={index} className="destination-field">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange("amenities", index, e.target.value)
                  }
                  className={emptyFields.includes("amenities") ? "error" : ""}
                />
                <button
                  className="removeBtn"
                  type="button"
                  onClick={() => handleRemoveItem("amenities", index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="addFacilityBtn"
              type="button"
              style={{ marginBottom: "20px" }}
              onClick={() => handleAddItem("amenities")}
            >
              Add Amenity
            </button>
          </div>
          <div className="submitBtn">
            <button type="submit">Update Hotel</button>
          </div>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </>
  );
};

export default HotelEditForm;
