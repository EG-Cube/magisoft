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

  const itinerary = await Itinerary.findById(id);

  if (!itinerary) {
    return res.status(404).json({ error: "No such itinerary" });
  }

  res.status(200).json(itinerary);
};

// create new itinerary
const createItinerary = async (req, res) => {
  const {
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
    itineraryDays,
    inclusions,
    exclusions,
    termsAndConditions,
    disclaimer,
  } = req.body;

  let emptyFields = [];

  // Required fields validation
  if (!fromDate) emptyFields.push("fromDate");
  if (!toDate) emptyFields.push("toDate");
  if (
    !passengers ||
    !passengers.adults ||
    !passengers.children ||
    !passengers.infants
  )
    emptyFields.push("passengers");
  if (!destinations || destinations.length === 0)
    emptyFields.push("destinations");
  if (!fromLocation) emptyFields.push("fromLocation");
  if (!toLocation) emptyFields.push("toLocation");
  if (!hotelStarRating) emptyFields.push("hotelStarRating");
  if (!budget) emptyFields.push("budget");
  if (!numberOfDays) emptyFields.push("numberOfDays");
  if (!numberOfRooms) emptyFields.push("numberOfRooms");
  if (!phoneNumber) emptyFields.push("phoneNumber");
  if (!emailAddress) emptyFields.push("emailAddress");
  if (!flightBookingRequired) emptyFields.push("flightBookingRequired");
  if (!mealPlan) emptyFields.push("mealPlan");
  if (!purpose) emptyFields.push("purpose");
  if (!itineraryDays || itineraryDays.length === 0)
    emptyFields.push("itineraryDays");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields", emptyFields });
  }

  // Add doc to db
  try {
    const user_id = req.user._id;
    const itinerary = await Itinerary.create({
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
      itineraryDays,
      inclusions,
      exclusions,
      termsAndConditions,
      disclaimer,
      user_id,
    });
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a itinerary
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

// update a itinerary
const updateItinerary = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such itinerary" });
  }

  const itinerary = await Itinerary.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!itinerary) {
    return res.status(400).json({ error: "No such itinerary" });
  }

  res.status(200).json(itinerary);
};

module.exports = {
  getItineraries,
  getItinerary,
  createItinerary,
  deleteItinerary,
  updateItinerary,
};
