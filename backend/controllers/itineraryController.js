const Itinerary = require("../models/itineraryModel");
const mongoose = require("mongoose");

// get all itineraries
const getItineraries = async (req, res) => {
  const user_id = req.user._id;
  const itineraries = await Itinerary.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(itineraries);
};

// get a single itinerary
const getItinerary = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such itinerary" });
  }

  const itinerary = await Itinerary.findById(id).populate("days.sites");

  if (!itinerary) {
    return res.status(404).json({ error: "No such itinerary" });
  }

  res.status(200).json(itinerary);
};

// get a itineraries by user
const getUserItineraries = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such itineraries" });
    }

    const itineraries = await Itinerary.find({ allocatedTo: id });

    if (!itineraries) {
      return res.status(404).json({ error: "No such itineraries" });
    }

    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create new itinerary
const createItinerary = async (req, res) => {
  const {
    name,
    description,
    days,
  } = req.body;

  let emptyFields = [];

  // Required fields validation
  if (!name) emptyFields.push("name");
  if (!days || days.length === 0) emptyFields.push("days");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields", emptyFields });
  }

  // Add doc to db
  try {
    const user_id = req.user._id;
    const itinerary = await Itinerary.create({
      name,
      description,
      days,
      user_id,
    });
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an itinerary
const deleteItinerary = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such itinerary" });
  }

  const itinerary = await Itinerary.findOneAndDelete({ _id: id });

  if (!itinerary) {
    return res.status(400).json({ error: "No such itinerary" });
  }

  res.status(200).json(itinerary);
};

// update an itinerary
const updateItinerary = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such itinerary" });
  }

  const itinerary = await Itinerary.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  ).populate("days.sites");

  if (!itinerary) {
    return res.status(400).json({ error: "No such itinerary" });
  }

  res.status(200).json(itinerary);
};

module.exports = {
  getItineraries,
  getItinerary,
  getUserItineraries,
  createItinerary,
  deleteItinerary,
  updateItinerary,
};
