const mongoose = require("mongoose");

const EquipmentRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rollNumber: { type: String, required: true }, // Roll number of the student making the request
  equipmentName: { type: String, required: true }, // Name of the requested equipment
  quantity: { type: Number, required: true, min: 1 }, // Number of items requested
  duration: { type: String, required: true }, // Duration (e.g., "2 hours", "1 day")
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, // Request status
  requestDate: { type: Date, default: Date.now } // Timestamp of request
});

module.exports = mongoose.model("EquipmentRequest", EquipmentRequestSchema);

