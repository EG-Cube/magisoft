const Transport = require("../models/transportModel");
const mongoose = require("mongoose");

// get all transports
const getTransports = async (req, res) => {
  try {
    const transports = await Transport.find().sort({ createdAt: -1 });
    res.status(200).json(transports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a single transport
const getTransport = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such transport" });
    }

    const transport = await Transport.findById(id);

    if (!transport) {
      return res.status(404).json({ error: "No such transport" });
    }

    res.status(200).json(transport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create new transport
const createTransport = async (req, res) => {
  const {
    company,
    modeOfTransport,
    // fromLocation,
    // toLocation,
    contactNumber,
    email,
    description,
    // distance,
    // duration,
  } = req.body;

  try {
    const transport = await Transport.create({
      company,
      modeOfTransport,
      // fromLocation,
      // toLocation,
      contactNumber,
      email,
      description,
      // distance,
      // duration,
    });
    res.status(201).json(transport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an transport
const deleteTransport = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such transport" });
    }

    const transport = await Transport.findOneAndDelete({ _id: id });

    if (!transport) {
      return res.status(404).json({ error: "No such transport" });
    }

    res.status(200).json(transport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update an transport
const updateTransport = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such transport" });
    }

    const transport = await Transport.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!transport) {
      return res.status(404).json({ error: "No such transport" });
    }

    res.status(200).json(transport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTransports,
  getTransport,
  createTransport,
  deleteTransport,
  updateTransport,
};
