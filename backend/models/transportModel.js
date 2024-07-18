const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Main Transport Schema
const transportSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    modeOfTransport: {
      type: String,
      required: true,
      enum: ["Bus", "Train", "Flight", "Ship"], // Example transport modes, adjust as needed
    },
    fromLocation: {
      type: String,
      required: true,
      trim: true,
    },
    toLocation: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transport", transportSchema);
