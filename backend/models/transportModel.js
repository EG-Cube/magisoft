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
      enum: ["Cab","Bus", "Train", "Flight", "Ship"], // Example transport modes, adjust as needed
    },
    // fromLocation: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // toLocation: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    contactNumber: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
    },
    // description: {
    //   type: String,
    //   required: false,
    //   trim: true,
    // },
    // distance: {
    //   type: Number,
    //   required: true,
    // },
    // duration: {
    //   type: Number,
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transport", transportSchema);
