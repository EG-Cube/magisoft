const express = require("express");
const {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
} = require("../controllers/restaurantController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require auth for all restaurant routes
router.use(requireAuth);

// GET all restaurants
router.get("/", getRestaurants);

// GET a single restaurant
router.get("/:id", getRestaurant);

// POST a new restaurant
router.post("/", createRestaurant);

// DELETE an restaurant
router.delete("/:id", deleteRestaurant);

// UPDATE an restaurant
router.patch("/:id", updateRestaurant);

module.exports = router;
