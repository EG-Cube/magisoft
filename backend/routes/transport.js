const express = require("express");
const {
  createTransport,
  getTransports,
  getTransport,
  deleteTransport,
  updateTransport,
} = require("../controllers/transportController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require auth for all transport routes
router.use(requireAuth);

// GET all transports
router.get("/", getTransports);

// GET a single transport
router.get("/:id", getTransport);

// POST a new transport
router.post("/", createTransport);

// DELETE an transport
router.delete("/:id", deleteTransport);

// UPDATE an transport
router.patch("/:id", updateTransport);

module.exports = router;
