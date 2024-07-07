const express = require('express');
const {
  createEnquiry,
  getEnquiries,
  getEnquiry,
  deleteEnquiry,
  updateEnquiry
} = require('../controllers/enquiryController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require auth for all enquiry routes
router.use(requireAuth);

// GET all enquiries
router.get('/', getEnquiries);

// GET a single enquiry
router.get('/:id', getEnquiry);

// POST a new enquiry
router.post('/', createEnquiry);

// DELETE an enquiry
router.delete('/:id', deleteEnquiry);

// UPDATE an enquiry
router.patch('/:id', updateEnquiry);

module.exports = router;
