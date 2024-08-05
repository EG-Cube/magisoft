const mongoose = require("mongoose");
const ItinerarySchema = require("./itineraryModel"); // Import the Itinerary schema

const Schema = mongoose.Schema;

// Sub-schema for Passengers
const PassengerSchema = new Schema({
  adults: { type: Number, required: true, min: 0 },
  children: { type: Number, required: true, min: 0 },
  infants: { type: Number, required: true, min: 0 },
});

// Main Enquiry Schema
const enquirySchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
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
    currency: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfDays: {
      type: Number,
      required: true,
    },
    numberOfNights: {
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
      match: /^\+\d{1,3}\s?\d{1,14}(\s?\d{1,13})?$/, // Regular expression to include country code
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
    remarks: {
      type: String,
      default: "",
    },
    enteredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    salesTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    operationsTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    accountingTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["Pending", "Verified", "Archived"],
      default: "Pending",
    },
    itineraries: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Itinerary",
      required: false,
    }, // Array of Itinerary schemas
    activeItinerary: {
      type: Schema.Types.ObjectId,
      ref: "Itinerary",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
