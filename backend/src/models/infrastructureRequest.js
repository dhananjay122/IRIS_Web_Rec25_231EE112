const mongoose = require("mongoose");

const InfrastructureRequestSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true }, // Roll number of the student making the request
  infrastructureName: { type: String, required: true }, // Name of the requested infrastructure
  duration: { type: String, required: true }, // Duration (e.g., "2 hours", "1 day")
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, // Request status
  requestDate: { type: Date, default: Date.now } // Timestamp of request
});

module.exports = mongoose.model("InfrastructureRequest", InfrastructureRequestSchema);