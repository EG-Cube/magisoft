const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Main Hotel Schema
const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: false,
      trim: true,
    },
    starRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      required: false,
      trim: true,
    },
    availableRoomTypes: {
      type: [String],
      required: true,
    },
    availableMealPlans: {
      type: [String],
      required: true,
    },
    amenities: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
