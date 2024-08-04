import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/form.css";

const TransportCreateForm = () => {
  const { user } = useAuthContext();

  const API_URL = process.env.REACT_APP_API_URL;

  const initialFormData = {
    company: "",
    modeOfTransport: "",
    fromLocation: "",
    toLocation: "",
    contactNumber: "",
    email: "",
    description: "",
    distance: "",
    duration: "",
  };

  const modeOptions = ["Cab", "Bus", "Train", "Flight", "Ship"];

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const requiredFields = [
      "company",
      "modeOfTransport",
      "fromLocation",
      "toLocation",
      "distance",
      "duration",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setEmptyFields(missingFields);
      setError("Please fill in all the required fields");
      return;
    }

    // Ensure distance and duration are numbers
    const sanitizedFormData = {
      ...formData,
      distance: Number(formData.distance),
      duration: Number(formData.duration),
    };

    console.log("Form Data before sending:", sanitizedFormData);

    const response = await fetch(`${API_URL}/api/transport`, {
      method: "POST",
      body: JSON.stringify(sanitizedFormData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });
    const json = await response.json();

    console.log("Response from server:", json);

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    } else {
      setFormData(initialFormData);
      setError(null);
      setEmptyFields([]);
      console.log("New transport added", json);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a New Transport</h3>

      <div className="row">
        <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            onChange={handleChange}
            value={formData.company}
            className={emptyFields.includes("company") ? "error" : ""}
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label>Mode of Transport:</label>
          <select
            name="modeOfTransport"
            onChange={handleChange}
            value={formData.modeOfTransport}
            className={emptyFields.includes("modeOfTransport") ? "error" : ""}
          >
            <option key={""} value={""}>
              {""}
            </option>
            {modeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div>
          <label>From Location:</label>
          <input
            type="text"
            name="fromLocation"
            onChange={handleChange}
            value={formData.fromLocation}
            className={emptyFields.includes("fromLocation") ? "error" : ""}
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label>To Location:</label>
          <input
            type="text"
            name="toLocation"
            onChange={handleChange}
            value={formData.toLocation}
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
            value={formData.contactNumber}
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label>Distance (in km):</label>
          <input
            type="number"
            name="distance"
            onChange={handleChange}
            value={formData.distance}
            className={emptyFields.includes("distance") ? "error" : ""}
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label>Duration (in hours):</label>
          <input
            type="number"
            name="duration"
            onChange={handleChange}
            value={formData.duration}
            className={emptyFields.includes("duration") ? "error" : ""}
          />
        </div>
      </div>

      <div className="submitBtn">
        <button type="submit">Add Transport</button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TransportCreateForm;
