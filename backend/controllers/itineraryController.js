const Itinerary = require("../models/itineraryModel");
const Enquiry = require("../models/enquiryModel");
const mongoose = require("mongoose");

// Get all itineraries
const getItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find().sort({
      createdAt: -1,
    });
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
      path: "days.events",
      populate: {
        path: "siteRef transportRef hotelRef restaurantRef",
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
  const {
    name,
    description,
    days,
    inclusions,
    exclusions,
    tandcs,
    disclaimers,
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

  try {
    const user_id = req.user._id;
    const itinerary = await Itinerary.create({
      name,
      description,
      days,
      user_id,
      inclusions,
      exclusions,
      tandcs,
      disclaimers,
    });
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete an itinerary and remove references in enquiries
const deleteItinerary = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid itinerary ID" });
  }

  try {
    // Find and delete the itinerary
    const itinerary = await Itinerary.findOneAndDelete({ _id: id });

    if (!itinerary) {
      return res.status(404).json({ error: "No such itinerary" });
    }

    // Remove the itinerary reference from the activeItinerary field in enquiries
    await Enquiry.updateMany(
      { activeItinerary: id }, // Match enquiries with the activeItinerary set to the deleted itinerary
      { $unset: { activeItinerary: null } } // Unset (remove) the activeItinerary field
    );

    // Remove the itinerary reference from the itineraries array in enquiries
    await Enquiry.updateMany(
      { itineraries: id }, // Match enquiries where the itinerary is in the itineraries array
      { $pull: { itineraries: id } } // Pull (remove) the specific itinerary from the array
    );

    // Respond with the deleted itinerary details
    res
      .status(200)
      .json({ message: "Itinerary deleted and references removed", itinerary });
  } catch (error) {
    // Handle any errors
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
      path: "days.events",
      populate: {
        path: "site transport.transportRef hotel.hotelRef restaurant.restaurantRef",
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
