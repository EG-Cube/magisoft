const Enquiry = require("../models/enquiryModel");
const mongoose = require("mongoose");

// get all enquiries
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a single enquiry
const getEnquiry = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such enquiry" });
    }

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({ error: "No such enquiry" });
    }

    res.status(200).json(enquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get enquiries for sales user
const getSalesEnquiries = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such enquiries" });
    }

    const enquiries = await Enquiry.find({ salesTo: id });

    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get enquiries for operations user
const getOperationsEnquiries = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such enquiries" });
    }

    const enquiries = await Enquiry.find({
      operationsTo: id,
      status: "Verified",
    });

    if (!enquiries.length) {
      return res.status(404).json({ error: "No such enquiries" });
    }

    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get enquiries for accounting user
const getAccountingEnquiries = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such enquiries" });
    }

    const enquiries = await Enquiry.find({ accountingTo: id });

    if (!enquiries.length) {
      return res.status(404).json({ error: "No such enquiries" });
    }

    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get enquiry based on itinerary ID
const getEnquiryFromItinerary = async (req, res) => {
  const { id } = req.params; // Get itinerary ID from request parameters

  try {
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid Itinerary ID" });
    }

    // Find enquiry where the itinerary ID matches either in itineraries array or activeItinerary field
    const enquiry = await Enquiry.findOne({
      $or: [
        { itineraries: id }, // Itinerary is in the itineraries array
        { activeItinerary: id }, // Itinerary is the active one
      ],
    }).populate("itineraries activeItinerary"); // Optionally populate itinerary details

    // Check if no enquiry was found
    if (!enquiry) {
      return res
        .status(404)
        .json({ error: "No enquiry found for the given itinerary" });
    }

    // Respond with the found enquiry
    res.status(200).json(enquiry);
  } catch (error) {
    // Handle any errors and respond with a 500 status code
    res.status(500).json({ error: error.message });
  }
};

// create new enquiry
const createEnquiry = async (req, res) => {
  const {
    firstName,
    lastName,
    fromDate,
    toDate,
    passengers,
    destinations,
    fromLocation,
    toLocation,
    hotelStarRating,
    budget,
    currency,
    numberOfDays,
    numberOfNights,
    numberOfRooms,
    roomComments,
    phoneNumber,
    emailAddress,
    flightBookingRequired,
    mealPlan,
    purpose,
    remarks,
    enteredBy,
  } = req.body;

  try {
    const enquiry = await Enquiry.create({
      firstName,
      lastName,
      fromDate,
      toDate,
      passengers,
      destinations,
      fromLocation,
      toLocation,
      hotelStarRating,
      budget,
      currency,
      numberOfDays,
      numberOfNights,
      numberOfRooms,
      roomComments,
      phoneNumber,
      emailAddress,
      flightBookingRequired,
      mealPlan,
      purpose,
      remarks,
      enteredBy,
    });
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an enquiry
const deleteEnquiry = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such enquiry" });
    }

    const enquiry = await Enquiry.findOneAndDelete({ _id: id });

    if (!enquiry) {
      return res.status(404).json({ error: "No such enquiry" });
    }

    res.status(200).json(enquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update an enquiry
const updateEnquiry = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such enquiry" });
    }

    const enquiry = await Enquiry.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ error: "No such enquiry" });
    }

    res.status(200).json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// allocate an enquiry for sales
const allocateSalesTo = async (req, res) => {
  const { id, aid } = req.params;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(aid)
    ) {
      return res.status(404).json({ error: "Invalid enquiry or user ID" });
    }

    const enquiry = await Enquiry.findOneAndUpdate(
      { _id: id },
      { salesTo: aid },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ error: "No such enquiry" });
    }

    res.status(200).json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// allocate an enquiry for operations
const allocateOperationsTo = async (req, res) => {
  const { id, aid } = req.params;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(aid)
    ) {
      return res.status(404).json({ error: "Invalid enquiry or user ID" });
    }

    const enquiry = await Enquiry.findOneAndUpdate(
      { _id: id },
      { operationsTo: aid },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ error: "No such enquiry" });
    }

    res.status(200).json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// allocate an enquiry for accounting
const allocateAccountingTo = async (req, res) => {
  const { id, aid } = req.params;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(aid)
    ) {
      return res.status(404).json({ error: "Invalid enquiry or user ID" });
    }

    const enquiry = await Enquiry.findOneAndUpdate(
      { _id: id },
      { accountingTo: aid },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ error: "No such enquiry" });
    }

    res.status(200).json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getEnquiries,
  getEnquiry,
  getSalesEnquiries,
  getOperationsEnquiries,
  getAccountingEnquiries,
  createEnquiry,
  deleteEnquiry,
  updateEnquiry,
  allocateSalesTo,
  allocateOperationsTo,
  allocateAccountingTo,
  getEnquiryFromItinerary,
};
