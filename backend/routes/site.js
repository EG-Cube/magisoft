const express = require("express");
const {
  createSite,
  getSites,
  getSite,
  deleteSite,
  updateSite,
} = require("../controllers/siteController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require auth for all site routes
router.use(requireAuth);

// GET all sites
router.get("/", getSites);

// GET a single site
router.get("/:id", getSite);

// POST a new site
router.post("/", createSite);

// DELETE an site
router.delete("/:id", deleteSite);

// UPDATE an site
router.patch("/:id", updateSite);

module.exports = router;
