const mongoose = require("mongoose");

const InfrastructureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "not available", "under maintenance"],
    default: "available",
  },
  capacity: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Infrastructure", InfrastructureSchema);


