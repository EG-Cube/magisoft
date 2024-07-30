const express = require('express')
const {
  createItinerary,
  getItineraries,
  getItinerary,
  getUserItineraries,
  deleteItinerary,
  updateItinerary
} = require('../controllers/itineraryController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all itinerary routes
router.use(requireAuth) 

// GET all itineraries
router.get('/', getItineraries)

//GET a single itinerary
router.get('/:id', getItinerary)

// GET a user enquiries
router.get("/filter/:id", getUserItineraries);

// POST a new itinerary
router.post('/', createItinerary)

// DELETE a itinerary
router.delete('/:id', deleteItinerary)

// UPDATE a itinerary
router.patch('/:id', updateItinerary)


module.exports = router