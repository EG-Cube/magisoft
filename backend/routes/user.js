const express = require("express");
const requireAuth = require("../middleware/requireAuth");

// controller functions
const {
  loginUser,
  signupUser,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// Require auth for all user routes
router.use(requireAuth);

// GET all users
router.get("/", getUsers);

//GET a single user
router.get("/:id", getUser);

// POST a new user
router.post("/", createUser);

// DELETE a user
router.delete("/:id", deleteUser);

// UPDATE a user
router.patch("/:id", updateUser);

module.exports = router;
