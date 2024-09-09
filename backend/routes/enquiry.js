const express = require("express");
const {
  getEnquiries,
  getEnquiry,
  getSalesEnquiries,
  getOperationsEnquiries,
  getAccountingEnquiries,
  createEnquiry,
  deleteEnquiry,
  updateEnquiry,
  allocateSalesTo,
  allocateOperationsTo,
  allocateAccountingTo,
  getEnquiryFromItinerary,
} = require("../controllers/enquiryController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require auth for all enquiry routes
router.use(requireAuth);

// GET all enquiries
router.get("/", getEnquiries);

// GET a single enquiry
router.get("/:id", getEnquiry);

// GET sales enquiries
router.get("/sales/:id", getSalesEnquiries);

// GET operations enquiries
router.get("/operations/:id", getOperationsEnquiries);

// GET accounting enquiries
router.get("/accounting/:id", getAccountingEnquiries);

// GET enquiry from itinerary
router.get("/itinerary/:id", getEnquiryFromItinerary);

// POST a new enquiry
router.post("/", createEnquiry);

// DELETE an enquiry
router.delete("/:id", deleteEnquiry);

// UPDATE an enquiry
router.patch("/:id", updateEnquiry);

// UPDATE an enquiry with sales allocation
router.patch("allocate/:id/:aid", allocateSalesTo);

// UPDATE an enquiry with operations allocation
router.patch("allocate/:id/:aid", allocateOperationsTo);

// UPDATE an enquiry with accounting allocation
router.patch("allocate/:id/:aid", allocateAccountingTo);

module.exports = router;
