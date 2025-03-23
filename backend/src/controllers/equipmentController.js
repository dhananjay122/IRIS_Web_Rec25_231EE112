const Equipment = require("../models/Equipment");
const Booking = require("../models/Booking");
const User = require("../models/User");
// Add Equipment
exports.addEquipment = async (req, res) => {
  try {
    const { name, category, quantity, status } = req.body;
    const equipment = new Equipment({ name, category, quantity, status });
    await equipment.save();
    res.status(201).json(equipment);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Update equipment details
exports.updateEquipment = async (req, res) => {
  try {
    const { name, quantity, availability, condition } = req.body;

    // Find the equipment by name
    let equipment = await Equipment.findOne({ name });
    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    // Update fields if provided
    if (quantity !== undefined) equipment.quantity = quantity;
    if (availability) equipment.availability = availability;
    if (condition) equipment.condition = condition;

    await equipment.save();
    res.json({ message: "Equipment updated successfully", equipment });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};



