const Hotel = require("../models/hotelModel");
const mongoose = require("mongoose");

// get all hotels
const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a single hotel
const getHotel = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such hotel" });
    }

    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({ error: "No such hotel" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create new hotel
const createHotel = async (req, res) => {
  const {
    name,
    address,
    city,
    state,
    country,
    pincode,
    starRating,
    contactNumber,
    email,
    website,
    availableRoomTypes,
    availableMealPlans,
    amenities,
  } = req.body;

  try {
    const hotel = await Hotel.create({
      name,
      address,
      city,
      state,
      country,
      pincode,
      starRating,
      contactNumber,
      email,
      website,
      availableRoomTypes,
      availableMealPlans,
      amenities,
    });
    res.status(201).json(hotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an hotel
const deleteHotel = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such hotel" });
    }

    const hotel = await Hotel.findOneAndDelete({ _id: id });

    if (!hotel) {
      return res.status(404).json({ error: "No such hotel" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update an hotel
const updateHotel = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such hotel" });
    }

    const hotel = await Hotel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({ error: "No such hotel" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getHotels,
  getHotel,
  createHotel,
  deleteHotel,
  updateHotel,
};
