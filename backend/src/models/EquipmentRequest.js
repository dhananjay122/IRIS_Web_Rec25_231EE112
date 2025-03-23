const mongoose = require("mongoose");

const EquipmentRequestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Student making the request
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true }, // Requested equipment
  quantity: { type: Number, required: true, min: 1 }, // Number of items requested
  duration: { type: String, required: true }, // Duration (e.g., "2 hours", "1 day")
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, // Request status
  reason: { type: String }, // Reason for rejection (if any)
  requestDate: { type: Date, default: Date.now }, // Timestamp of request
});

module.exports = mongoose.model("EquipmentRequest", EquipmentRequestSchema);

