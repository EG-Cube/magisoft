const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VisitingHoursSchema = new Schema({
  start: {
    type: String,
    required: true,
    trim: true,
  },
  end: {
    type: String,
    required: true,
    trim: true,
  },
});

// Site Schema
const siteSchema = new Schema(
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
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Tourist", "Historical", "Business", "Recreational", "Religious"],
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    visitingHours: {
      type: VisitingHoursSchema,
      required: true,
    },
    facilities: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Site", siteSchema);
