const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  infrastructure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Infrastructure",
    required: true,
  },
  infrastructureName: {
    type: String,
    required: true,
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
  },
  timeSlot: {
    type: String, // Example: "15:00-16:00"
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  adminComments: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);


