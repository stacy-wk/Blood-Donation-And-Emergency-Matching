import {
  getDonors,
  updateDonor,
  findBestDonors
} from "../services/donor.service.js";

export const getDonorsController = (req, res) => {
  res.json(getDonors());
};

export const updateDonorController = (req, res) => {
  try {
    const result = updateDonor(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};