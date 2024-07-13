import { useEffect, useState } from "react";
import "../../styles/EnquiryForm.css";
import { useUserContext } from "../../hooks/useUserContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const AdminCreateEnquiryForm = () => {
  const { user } = useAuthContext();
  const { users, dispatch } = useUserContext();

  const initialFormData = {
    firstName: "",
    lastName: "",
    fromDate: "",
    toDate: "",
    passengers: {
      adults: 0,
      children: 0,
      infants: 0,
    },
    destinations: [""],
    fromLocation: "",
    toLocation: "",
    hotelStarRating: 1,
    budget: 0,
    numberOfDays: 0,
    numberOfRooms: 0,
    roomComments: "",
    phoneNumber: "",
    emailAddress: "",
    flightBookingRequired: false,
    mealPlan: "CP",
    purpose: "",
    remarks: "",
    enteredBy: user?.user?._id,
    allocatedTo: null,
  };

  const mealPlanOptions = ["CP", "MAP", "AP"];

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`http://localhost:4000/api/user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_USERS", payload: json });
      }
    };

    fetchUsers();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name.includes("passengers.")) {
      const passengerType = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        passengers: {
          ...prevFormData.passengers,
          [passengerType]: newValue,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
    }
  };

  const handleDestinationChange = (index, value) => {
    const newDestinations = [...formData.destinations];
    newDestinations[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      destinations: newDestinations,
    }));
  };

  const handleAddDestination = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      destinations: [...prevFormData.destinations, ""],
    }));
  };

  const handleRemoveDestination = (index) => {
    const newDestinations = formData.destinations.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      destinations: newDestinations,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    } else {
      console.log(user, user?.user?.firstName + " " + user?.user?.lastName);
      setFormData((prevFormData) => ({
        ...prevFormData,
        enteredBy: user?.user?._id,
      }));
    }

    const requiredFields = [
      "firstName",
      "lastName",
      "fromDate",
      "toDate",
      "passengers.adults",
      "destinations",
      "fromLocation",
      "toLocation",
      "hotelStarRating",
      "budget",
      "numberOfDays",
      "numberOfRooms",
      "phoneNumber",
      "emailAddress",
      "mealPlan",
      "purpose",
    ];

    const missingFields = requiredFields.filter((field) => {
      const [mainField, subField] = field.split(".");
      return subField ? !formData[mainField][subField] : !formData[mainField];
    });

    if (missingFields.length > 0) {
      setEmptyFields(missingFields);
      setError("Please fill in all the required fields");
      return;
    }

    const response = await fetch("/api/enquiry", {
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
      console.log("New enquiry added", json);
    }
  };

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <h3>Add a New Enquiry</h3>

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
          <label>From Date:</label>
          <input
            type="date"
            name="fromDate"
            onChange={handleChange}
            value={formData.fromDate}
            className={emptyFields.includes("fromDate") ? "error" : ""}
          />
        </div>

        <div>
          <label>To Date:</label>
          <input
            type="date"
            name="toDate"
            onChange={handleChange}
            value={formData.toDate}
            className={emptyFields.includes("toDate") ? "error" : ""}
          />
        </div>

        <div>
          <label>No. of Days:</label>
          <input
            type="number"
            name="numberOfDays"
            onChange={handleChange}
            value={formData.numberOfDays}
            className={emptyFields.includes("numberOfDays") ? "error" : ""}
          />
        </div>
      </div>
      <div className="row">
        <div>
          <label>Adults:</label>
          <input
            type="number"
            name="passengers.adults"
            onChange={handleChange}
            value={formData.passengers.adults}
            className={emptyFields.includes("passengers.adults") ? "error" : ""}
          />
        </div>

        <div>
          <label>Children:</label>
          <input
            type="number"
            name="passengers.children"
            onChange={handleChange}
            value={formData.passengers.children}
            className={
              emptyFields.includes("passengers.children") ? "error" : ""
            }
          />
        </div>

        <div>
          <label>Infants:</label>
          <input
            type="number"
            name="passengers.infants"
            onChange={handleChange}
            value={formData.passengers.infants}
            className={
              emptyFields.includes("passengers.infants") ? "error" : ""
            }
          />
        </div>
      </div>
      <div>
        <label>Destinations:</label>
        {formData.destinations.map((item, index) => (
          <div key={index} className="destination-field">
            <input
              type="text"
              value={item}
              onChange={(e) => handleDestinationChange(index, e.target.value)}
              className={emptyFields.includes("destinations") ? "error" : ""}
            />
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemoveDestination(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="addDestinationBtn"
          type="button"
          style={{ marginBottom: "20px" }}
          onClick={handleAddDestination}
        >
          Add Destination
        </button>
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
          <label>Star Rating:</label>
          <input
            type="number"
            name="hotelStarRating"
            onChange={handleChange}
            value={formData.hotelStarRating}
            min={1}
            max={5}
            className={emptyFields.includes("hotelStarRating") ? "error" : ""}
          />
        </div>

        <div>
          <label>No. of Rooms:</label>
          <input
            type="number"
            name="numberOfRooms"
            onChange={handleChange}
            value={formData.numberOfRooms}
            className={emptyFields.includes("numberOfRooms") ? "error" : ""}
          />
        </div>
        <div>
          <label>Meal Plan:</label>
          <select
            name="mealPlan"
            onChange={handleChange}
            value={formData.mealPlan}
            className={emptyFields.includes("mealPlan") ? "error" : ""}
          >
            {mealPlanOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label>Room Comments:</label>
        <textarea
          type="text"
          name="roomComments"
          onChange={handleChange}
          value={formData.roomComments}
        />
      </div>
      <div className="row">
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            value={formData.phoneNumber}
            className={emptyFields.includes("phoneNumber") ? "error" : ""}
          />
        </div>

        <div>
          <label>Email Address:</label>
          <input
            type="email"
            name="emailAddress"
            onChange={handleChange}
            value={formData.emailAddress}
            className={emptyFields.includes("emailAddress") ? "error" : ""}
          />
        </div>
      </div>
      <div className="row">
        <label>Flight Booking Required:</label>
        <input
          type="checkbox"
          name="flightBookingRequired"
          onChange={handleChange}
          checked={formData.flightBookingRequired}
          className={
            emptyFields.includes("flightBookingRequired") ? "error" : ""
          }
        />
      </div>

      <div className="row">
        <div>
          <label>Budget:</label>
          <input
            type="number"
            name="budget"
            onChange={handleChange}
            value={formData.budget}
            className={emptyFields.includes("budget") ? "error" : ""}
          />
        </div>
        <div>
          <label>Purpose:</label>
          <input
            type="text"
            name="purpose"
            onChange={handleChange}
            value={formData.purpose}
            className={emptyFields.includes("purpose") ? "error" : ""}
          />
        </div>
      </div>

      <div>
        <label>Remarks:</label>
        <textarea
          type="text"
          name="remarks"
          onChange={handleChange}
          value={formData.remarks}
        />
      </div>

      <div>
        <label>Allocated To:</label>
        <select
          name="allocatedTo"
          onChange={handleChange}
          value={formData.allocatedTo ? formData.allocatedTo : ""}
        >
          <option value={""}>-</option>
          {users?.map((option) => (
            <option key={option._id} value={option._id}>
              {option.firstName} {option.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className="submitBtn">
        <button type="submit">Add Enquiry</button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AdminCreateEnquiryForm;
