const Restaurant = require("../models/restaurantModel");
const mongoose = require("mongoose");

// get all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a single restaurant
const getRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such restaurant" });
    }

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ error: "No such restaurant" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create new restaurant
const createRestaurant = async (req, res) => {
  const {
    name,
    cuisine,
    address,
    city,
    state,
    country,
    pincode,
    contactNumber,
    email,
    website,
    availableMeals,
    amenities,
  } = req.body;

  try {
    const restaurant = await Restaurant.create({
      name,
      cuisine,
      address,
      city,
      state,
      country,
      pincode,
      contactNumber,
      email,
      website,
      availableMeals,
      amenities,
    });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an restaurant
const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such restaurant" });
    }

    const restaurant = await Restaurant.findOneAndDelete({ _id: id });

    if (!restaurant) {
      return res.status(404).json({ error: "No such restaurant" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update an restaurant
const updateRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such restaurant" });
    }

    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ error: "No such restaurant" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
};
