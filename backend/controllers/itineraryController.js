const Itinerary = require("../models/itineraryModel");
const mongoose = require("mongoose");

// Get all itineraries
const getItineraries = async (req, res) => {
  const user_id = req.user._id;
  try {
    const itineraries = await Itinerary.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single itinerary
const getItinerary = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such itinerary" });
  }

  try {
    const itinerary = await Itinerary.findById(id).populate({
      path: 'days.events',
      populate: {
        path: 'siteRef transportRef hotelRef restaurantRef',
      },
    });

    if (!itinerary) {
      return res.status(404).json({ error: "No such itinerary" });
    }

    res.status(200).json(itinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get itineraries by user
const getUserItineraries = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such itineraries" });
  }

  try {
    const itineraries = await Itinerary.find({ operationsAllocatedTo: id });

    if (!itineraries) {
      return res.status(404).json({ error: "No such itineraries" });
    }

    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new itinerary
const createItinerary = async (req, res) => {
  const { name, description, days } = req.body;

  let emptyFields = [];

  // Required fields validation
  if (!name) emptyFields.push("name");
  if (!days || days.length === 0) emptyFields.push("days");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const itinerary = await Itinerary.create({
      name,
      description,
      days,
      user_id,
    });
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an itinerary
const deleteItinerary = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such itinerary" });
  }

  try {
    const itinerary = await Itinerary.findOneAndDelete({ _id: id });

    if (!itinerary) {
      return res.status(404).json({ error: "No such itinerary" });
    }

    res.status(200).json(itinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an itinerary
const updateItinerary = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such itinerary" });
  }

  try {
    const itinerary = await Itinerary.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    ).populate({
      path: 'days.events',
      populate: {
        path: 'site transport.transportRef hotel.hotelRef restaurant.restaurantRef',
      },
    });

    if (!itinerary) {
      return res.status(404).json({ error: "No such itinerary" });
    }

    res.status(200).json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getItineraries,
  getItinerary,
  getUserItineraries,
  createItinerary,
  deleteItinerary,
  updateItinerary,
};
