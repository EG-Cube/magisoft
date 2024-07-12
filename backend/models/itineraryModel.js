const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Sub-schemas for reuse and clarity
const PassengerSchema = new Schema({
  adults: { type: Number, required: true, min: 0 },
  children: { type: Number, required: true, min: 0 },
  infants: { type: Number, required: true, min: 0 },
});

const SiteSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
});

const FoodSchema = new Schema({
  restaurant: { type: String, required: true },
  meal: { type: String, required: true },
});

const HotelAccommodationSchema = new Schema({
  hotel: { type: String, required: true },
  roomType: { type: String, required: true },
  number: { type: Number, required: true },
});

const TransportSchema = new Schema({
  from: { type: String },
  to: { type: String },
  mode: { type: String },
  hours: { type: Number },
  company: { type: String },
});

const ItineraryDaySchema = new Schema({
  dayNumber: { type: Number, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  locations: { type: [String], required: true },
  sites: { type: [SiteSchema] },
  activities: { type: [SiteSchema] },
  food: { type: [FoodSchema] },
  hotelAccommodation: { type: [HotelAccommodationSchema] },
  transport: { type: [TransportSchema] },
});

const itinerarySchema = new Schema(
  {
    fromDate: {
      type: Date,
      required: true,
      index: true,
    },
    toDate: {
      type: Date,
      required: true,
      index: true,
    },
    passengers: {
      type: PassengerSchema,
      required: true,
    },
    destinations: {
      type: [String],
      required: true,
    },
    fromLocation: {
      type: String,
      required: true,
    },
    toLocation: {
      type: String,
      required: true,
    },
    hotelStarRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    budget: {
      type: Number,
      required: true,
    },
    numberOfDays: {
      type: Number,
      required: true,
    },
    numberOfRooms: {
      type: Number,
      required: true,
    },
    roomComments: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    flightBookingRequired: {
      type: Boolean,
      required: true,
    },
    mealPlan: {
      type: String,
      enum: ["CP", "MAP", "AP"],
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    itineraryDays: {
      type: [ItineraryDaySchema],
      required: true,
    },
    inclusions: {
      type: [String],
    },
    exclusions: {
      type: [String],
    },
    termsAndConditions: {
      type: [String],
    },
    disclaimer: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);
