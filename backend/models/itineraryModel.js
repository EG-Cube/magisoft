const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Validation functions
const isRequiredForType = (value, contextType, expectedType) => {
  return contextType === expectedType ? !!value : true;
};

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
      validate: {
        validator: function (value) {
          return isRequiredForType(value, this.type, "site");
        },
        message: 'Site field is required for type "site".',
      },
    },
    from: {
      type: String,
      validate: {
        validator: function (value) {
          return isRequiredForType(value, this.type, "transport");
        },
        message: 'From field is required for type "transport".',
      },
    },
    to: {
      type: String,
      validate: {
        validator: function (value) {
          return isRequiredForType(value, this.type, "transport");
        },
        message: 'To field is required for type "transport".',
      },
    },
    distance: {
      type: Number, // Distance in kilometers
      validate: {
        validator: function (value) {
          return isRequiredForType(value, this.type, "transport");
        },
        message: 'Distance field is required for type "transport".',
      },
    },
    transportRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transport",
      validate: {
        validator: function (value) {
          return isRequiredForType(value, this.type, "transport");
        },
        message: 'Transport reference is required for type "transport".',
      },
    },
    roomType: {
      type: String,
      validate: {
        validator: function (value) {
          return isRequiredForType(value, this.type, "hotel");
        },
        message: 'Room type is required for type "hotel".',
      },
    },
    mealPlan: {
      type: String,
      validate: {
        validator: function (value) {
          return isRequiredForType(value, this.type, "hotel");
        },
        message: 'Meal plan is required for type "hotel".',
      },
    },
    hotelRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      validate: {
        validator: function (value) {
          return isRequiredForType(value, this.type, "hotel");
        },
        message: 'Hotel reference is required for type "hotel".',
      },
    },
    mealType: {
      type: String,
      validate: {
        validator: function (value) {
          return isRequiredForType(value, this.type, "restaurant");
        },
        message: 'Meal type is required for type "restaurant".',
      },
    },
    restaurantRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      validate: {
        validator: function (value) {
          return isRequiredForType(value, this.type, "restaurant");
        },
        message: 'Restaurant reference is required for type "restaurant".',
      },
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);
