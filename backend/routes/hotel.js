const express = require("express");
const {
  createHotel,
  getHotels,
  getHotel,
  deleteHotel,
  updateHotel,
} = require("../controllers/hotelController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require auth for all hotel routes
router.use(requireAuth);

// GET all hotels
router.get("/", getHotels);

// GET a single hotel
router.get("/:id", getHotel);

// POST a new hotel
router.post("/", createHotel);

// DELETE an hotel
router.delete("/:id", deleteHotel);

// UPDATE an hotel
router.patch("/:id", updateHotel);

module.exports = router;
