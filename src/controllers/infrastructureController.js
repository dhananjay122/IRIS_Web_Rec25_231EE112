const Infrastructure = require("../models/Infrastructure");

// Add new infrastructure (Admin)
const addInfrastructure = async (req, res) => {
  try {
    const { name, location, status, capacity } = req.body;

    const existingInfra = await Infrastructure.findOne({ name });
    if (existingInfra) return res.status(400).json({ message: "Infrastructure already exists" });

    const newInfrastructure = new Infrastructure({ name, location, status, capacity });
    await newInfrastructure.save();

    res.status(201).json({ message: "Infrastructure added successfully", newInfrastructure });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update infrastructure details (Admin)
const updateInfrastructure = async (req, res) => {
  try {
    const { infraId, status, capacity } = req.body;

    const infra = await Infrastructure.findById(infraId);
    if (!infra) return res.status(404).json({ message: "Infrastructure not found" });

    infra.status = status || infra.status;
    infra.capacity = capacity || infra.capacity;
    await infra.save();

    res.status(200).json({ message: "Infrastructure updated", infra });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all infrastructure
const getAllInfrastructure = async (req, res) => {
  try {
    const infrastructure = await Infrastructure.find();
    res.status(200).json(infrastructure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addInfrastructure, updateInfrastructure, getAllInfrastructure };

