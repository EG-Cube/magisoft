import { useState, useEffect, useContext } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import "../../styles/EnquiryForm.css";

const EditUserForm = ({ userID }) => {
  const { user: admin } = useAuthContext();
  const navigate = useNavigate();
  const { users, dispatch } = useContext(UserContext);

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
  
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      if (!admin) {
        setError("You must be logged in");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/user/${userID}`, {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });

        // Merge response data with initialFormData to ensure all fields are present
        setFormData({
          ...initialFormData,
          ...response.data,
        });
      } catch (error) {
        setError(error.response?.data?.error || "An error occurred");
      }
    };

    fetchUser();
  }, [userID, admin]);

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

    if (!admin) {
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
      const response = await axios.patch(`${API_URL}/api/user/${userID}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
      });

      setError(null);
      setEmptyFields([]);
      console.log("User updated", response.data);

      dispatch({ type: "UPDATE_USER", payload: response.data });

      navigate(`/admin/user/view/${userID}`);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
      setEmptyFields(error.response?.data?.emptyFields || []);
    }
  };

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <h3>Edit User</h3>

      <div className="row">
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName || ""}
            className={emptyFields.includes("firstName") ? "error" : ""}
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName || ""}
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
            value={formData.country || ""}
            className={emptyFields.includes("country") ? "error" : ""}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email || ""}
            className={emptyFields.includes("email") ? "error" : ""}
          />
        </div>
      </div>
      <div>
        <label>Roles:</label>
        {formData.roles &&
          formData.roles.map((item, index) => (
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
            value={formData.password || ""}
            className={emptyFields.includes("password") ? "error" : ""}
          />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword || ""}
            className={emptyFields.includes("confirmPassword") ? "error" : ""}
          />
        </div>
      </div>

      <div className="submitBtn">
        <button type="submit">Update User</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default EditUserForm;
