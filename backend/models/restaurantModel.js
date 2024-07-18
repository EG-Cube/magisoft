const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Sub-schema for Available Meals
const MealSchema = new Schema({
  mealType: {
    type: String,
    required: true,
    enum: ["Breakfast", "Lunch", "Dinner", "Snacks"], // Example meal types, adjust as needed
  },
  availability: {
    type: Boolean,
    required: true,
  },
});

// Main Restaurant Schema
const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cuisine: {
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
    availableMeals: {
      type: [MealSchema],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
