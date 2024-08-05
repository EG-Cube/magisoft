import { useState, useEffect, useContext } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TransportContext } from "../../context/TransportContext";
import "../../styles/form.css";

const TransportEditForm = ({ transportID }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { dispatch } = useContext(TransportContext);

  const API_URL = process.env.REACT_APP_API_URL;

  const initialFormData = {
    company: "",
    fromLocation: "",
    toLocation: "",
    contactNumber: "",
    email: "",
    description: "",
    distance: 0,
    duration: 0,
    modeOfTransport: "",
  };

  const modeOfTransportOptions = ["Cab", "Bus", "Train", "Flight", "Ship"];
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    const fetchTransport = async () => {
      if (!user) {
        setError("You must be logged in");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/transport/${transportID}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setFormData(response.data);
      } catch (error) {
        setError(error.response?.data?.error || "An error occurred");
      }
    };

    fetchTransport();
  }, [transportID, user, API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const requiredFields = [
      "company",
      "fromLocation",
      "toLocation",
      "contactNumber",
      "email",
      "modeOfTransport",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setEmptyFields(missingFields);
      setError("Please fill in all the required fields");
      console.log(missingFields);
      return;
    }

    try {
      const response = await axios.patch(
        `${API_URL}/api/transport/${transportID}`,
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
      console.log("Transport updated", response.data);

      dispatch({ type: "UPDATE_TRANSPORT", payload: response.data });

      navigate(`/operations/transport/view/${transportID}`);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
      setEmptyFields(error.response?.data?.emptyFields || []);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Edit Transport</h3>

      <div className="row">
        <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            onChange={handleChange}
            value={formData?.company}
            className={emptyFields.includes("company") ? "error" : ""}
          />
        </div>
      </div>
      <div className="row">
        <div>
          <label>From Location:</label>
          <input
            type="text"
            name="fromLocation"
            onChange={handleChange}
            value={formData?.fromLocation}
            className={emptyFields.includes("fromLocation") ? "error" : ""}
          />
        </div>
        <div>
          <label>To Location:</label>
          <input
            type="text"
            name="toLocation"
            onChange={handleChange}
            value={formData?.toLocation}
            className={emptyFields.includes("toLocation") ? "error" : ""}
          />
        </div>
      </div>
      <div className="row">
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
        <label>Distance (km):</label>
        <input
          type="number"
          name="distance"
          onChange={handleChange}
          value={formData?.distance}
          className={emptyFields.includes("distance") ? "error" : ""}
        />
      </div>
      <div>
        <label>Duration (hours):</label>
        <input
          type="number"
          name="duration"
          onChange={handleChange}
          value={formData?.duration}
          className={emptyFields.includes("duration") ? "error" : ""}
        />
      </div>
      <div className="row">
        <div>
          <label>Mode of Transport:</label>
          <select
            name="modeOfTransport"
            onChange={handleChange}
            value={formData?.modeOfTransport}
            className={emptyFields.includes("modeOfTransport") ? "error" : ""}
          >
            <option key={""} value={""}>
              {""}
            </option>
            {modeOfTransportOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="submitBtn">
        <button type="submit">Update Transport</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TransportEditForm;
