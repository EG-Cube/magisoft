require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const transportRoutes = require('./routes/transport')
const restaurantRoutes = require('./routes/restaurant')
const hotelRoutes = require('./routes/hotel')
const siteRoutes = require('./routes/site')
const enquiryRoutes = require('./routes/enquiry')
const itineraryRoutes = require('./routes/itinerary')
const userRoutes = require('./routes/user')

// express app
const app = express()

// Use the cors middleware
app.use(cors({
  origin: 'http://localhost:3000', // allow your frontend's origin
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'], // allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // allowed headers
}));

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/transport', transportRoutes)
app.use('/api/restaurant', restaurantRoutes)
app.use('/api/hotel', hotelRoutes)
app.use('/api/site', siteRoutes)
app.use('/api/enquiry', enquiryRoutes)
app.use('/api/itinerary', itineraryRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })