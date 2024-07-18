const Site = require("../models/siteModel");
const mongoose = require("mongoose");

// get all sites
const getSites = async (req, res) => {
  try {
    const sites = await Site.find().sort({ createdAt: -1 });
    res.status(200).json(sites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a single site
const getSite = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such site" });
    }

    const site = await Site.findById(id);

    if (!site) {
      return res.status(404).json({ error: "No such site" });
    }

    res.status(200).json(site);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create new site
const createSite = async (req, res) => {
  const { name, address, city, state, country, pincode, duration, type } =
    req.body;

  try {
    const site = await Site.create({
      name,
      address,
      city,
      state,
      country,
      pincode,
      duration,
      type,
    });
    res.status(201).json(site);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an site
const deleteSite = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such site" });
    }

    const site = await Site.findOneAndDelete({ _id: id });

    if (!site) {
      return res.status(404).json({ error: "No such site" });
    }

    res.status(200).json(site);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update an site
const updateSite = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such site" });
    }

    const site = await Site.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!site) {
      return res.status(404).json({ error: "No such site" });
    }

    res.status(200).json(site);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getSites,
  getSite,
  createSite,
  deleteSite,
  updateSite,
};
