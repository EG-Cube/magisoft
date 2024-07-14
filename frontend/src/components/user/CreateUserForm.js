import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/EnquiryForm.css";
import { useNavigate } from "react-router-dom";

const CreateUserForm = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate()
  
  const API_URL = process.env.REACT_APP_API_URL;

  const initialFormData = {
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    roles: [""],
    password: "",
    confirmPassword: "", // Add confirm password field
  };

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

  const handleRoleChange = (index, value) => {
    const newRoles = [...formData.roles];
    newRoles[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      roles: newRoles,
    }));
  };

  const handleAddRole = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      roles: [...prevFormData.roles, ""],
    }));
  };

  const handleRemoveRole = (index) => {
    const newRoles = formData.roles.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      roles: newRoles,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "country",
      "roles",
      "password",
      "confirmPassword",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setEmptyFields(missingFields);
      setError("Please fill in all the required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setEmptyFields(["password", "confirmPassword"]);
      return;
    }

    const response = await fetch(`${API_URL}/api/user`, {
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
      console.log("New user added", json);
      navigate(`/admin/user/view/${json._id}`)
    }

  };

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <h3>Add a New User</h3>

      <div className="row">
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            className={emptyFields.includes("firstName") ? "error" : ""}
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            className={emptyFields.includes("lastName") ? "error" : ""}
          />
        </div>
      </div>

      <div className="row">
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
        <label>Roles:</label>
        {formData.roles.map((item, index) => (
          <div key={index} className="destination-field">
            <input
              type="text"
              value={item}
              onChange={(e) => handleRoleChange(index, e.target.value)}
              className={emptyFields.includes("roles") ? "error" : ""}
            />
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemoveRole(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="addRoleBtn"
          type="button"
          style={{ marginBottom: "20px" }}
          onClick={handleAddRole}
        >
          Add Role
        </button>
      </div>

      <div className="row">
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className={emptyFields.includes("password") ? "error" : ""}
          />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            className={emptyFields.includes("confirmPassword") ? "error" : ""}
          />
        </div>
      </div>

      <div className="submitBtn">
        <button type="submit">Add User</button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CreateUserForm;
