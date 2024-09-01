const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Helper function for conditional required validation
const requiredIfType = (expectedType) => ({
  validator: function (value) {
    return this.type !== expectedType || !!value;
  },
  message: (props) => `${props.path} is required for type "${props.context.type}".`,
});

// Event Schema
const eventSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["site", "transport", "hotel", "restaurant"],
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // Duration in minutes
      required: true,
    },
    siteRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      validate: requiredIfType("site"),
    },
    from: {
      type: String,
      validate: requiredIfType("transport"),
    },
    to: {
      type: String,
      validate: requiredIfType("transport"),
    },
    distance: {
      type: Number, // Distance in kilometers
      validate: requiredIfType("transport"),
    },
    transportRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transport",
      validate: requiredIfType("transport"),
    },
    roomType: {
      type: String,
      validate: requiredIfType("hotel"),
    },
    mealPlan: {
      type: String,
      validate: requiredIfType("hotel"),
    },
    hotelRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      validate: requiredIfType("hotel"),
    },
    mealType: {
      type: String,
      validate: requiredIfType("restaurant"),
    },
    restaurantRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      validate: requiredIfType("restaurant"),
    },
  },
  { timestamps: true }
);

// Itinerary Day Schema
const itineraryDaySchema = new Schema({
  day: {
    type: Number,
    required: true,
  },
  events: {
    type: [eventSchema],
    required: true,
  },
});

// Itinerary Schema
const itinerarySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    days: {
      type: [itineraryDaySchema],
      required: true,
    },
    inclusions: {
      type: [String],
      required: true,
    },
    exclusions: {
      type: [String],
      required: true,
    },
    tandcs: {
      type: [String],
      required: true,
    },
    disclaimers: {
      type: [String],
      required: true,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);
