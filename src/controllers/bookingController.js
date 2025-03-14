const Booking = require("../models/Booking");
const Infrastructure = require("../models/Infrastructure");

// Request a booking
exports.requestBooking = async (req, res) => {
  try {
    const { infrastructureName, date, timeSlot } = req.body;
    const userId = req.user.id; // Extract user ID from the logged-in user

    // Check if the infrastructure exists
    const infrastructure = await Infrastructure.findOne({ name: infrastructureName });
    if (!infrastructure) {
      return res.status(404).json({ error: "Infrastructure not found" });
    }

    // Check if the slot is already booked
    const existingBooking = await Booking.findOne({ infrastructure: infrastructure._id, date, timeSlot, status: "approved" });
    if (existingBooking) {
      return res.status(400).json({ error: "Slot already booked" });
    }

    // Create a new booking request
    const booking = new Booking({
      user: userId,
      infrastructure: infrastructure._id,
      date,
      timeSlot,
      status: "pending", // Default status is pending
    });

    await booking.save();
    res.status(201).json({ message: "Booking request submitted", booking });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Approve a booking
exports.approveBooking = async (req, res) => {
  try {
    const { requestId } = req.params;
    const booking = await Booking.findByIdAndUpdate(requestId, { status: "approved" }, { new: true });

    if (!booking) {
      return res.status(404).json({ error: "Booking request not found" });
    }

    res.json({ message: "Booking approved", booking });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Reject a booking with admin comments
exports.rejectBooking = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { adminComment } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      requestId,
      { status: "rejected", adminComment },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: "Booking request not found" });
    }

    res.json({ message: "Booking rejected", booking });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Cancel a booking (student can cancel, admin may need to approve)
exports.cancelBooking = async (req, res) => {
  try {
    const { requestId } = req.params;
    const booking = await Booking.findByIdAndUpdate(
      requestId,
      { status: "canceled" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: "Booking canceled", booking });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId }).populate("infrastructure");

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


