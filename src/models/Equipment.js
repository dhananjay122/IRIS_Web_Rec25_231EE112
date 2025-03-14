const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ["available", "not available", "under maintenance"], default: "available" },
});

module.exports = mongoose.model("Equipment", EquipmentSchema);





