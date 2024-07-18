const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
    duration: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Tourist", "Historical", "Business", "Recreational"], // Example enum values, adjust as needed
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Site", siteSchema);
