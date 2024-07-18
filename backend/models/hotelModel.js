const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Sub-schema for Available Room Types
const RoomTypeSchema = new Schema({
  roomType: {
    type: String,
    required: true,
    enum: ["Single", "Double", "Suite", "Deluxe"], // Example room types, adjust as needed
  },
  availability: {
    type: Boolean,
    required: true,
  },
});

// Sub-schema for Available Meal Plans
const MealPlanSchema = new Schema({
  mealPlan: {
    type: String,
    required: true,
    enum: ["CP", "MAP", "AP"], // Example meal plans, adjust as needed
  },
  availability: {
    type: Boolean,
    required: true,
  },
});

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
    starRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    availableRoomTypes: {
      type: [RoomTypeSchema],
      required: true,
    },
    availableMealPlans: {
      type: [MealPlanSchema],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
