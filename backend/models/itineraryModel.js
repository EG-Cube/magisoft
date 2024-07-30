const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Itinerary Day Schema
const itineraryDaySchema = new Schema({
  day: {
    type: Number,
    required: true,
  },
  sites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Site",
      required: true,
    },
  ],
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
