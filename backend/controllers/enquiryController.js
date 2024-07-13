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

// get a enquiries by user
const getUserEnquiries = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such enquiries" });
    }

    const enquiries = await Enquiry.find({ allocatedTo: id });

    if (!enquiries) {
      return res.status(404).json({ error: "No such enquiries" });
    }

    res.status(200).json(enquiries);
  } catch (error) {
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
    numberOfDays,
    numberOfRooms,
    roomComments,
    phoneNumber,
    emailAddress,
    flightBookingRequired,
    mealPlan,
    purpose,
    remarks,
    enteredBy,
    allocatedTo,
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
      numberOfDays,
      numberOfRooms,
      roomComments,
      phoneNumber,
      emailAddress,
      flightBookingRequired,
      mealPlan,
      purpose,
      remarks,
      enteredBy,
      allocatedTo,
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

module.exports = {
  getEnquiries,
  getEnquiry,
  getUserEnquiries,
  createEnquiry,
  deleteEnquiry,
  updateEnquiry,
};
