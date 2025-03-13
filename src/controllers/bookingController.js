const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");
const Infrastructure = require("../models/Infrastructure");

// Create a booking (student request)
exports.createBooking = async (req, res) => {
  try {
    const { equipmentId, infraId, date, startTime, endTime } = req.body;
    const userId = req.user.id;

    if (!equipmentId && !infraId) return res.status(400).json({ message: "Specify either equipment or infrastructure" });

    const booking = await Booking.create({ userId, equipmentId, infraId, date, startTime, endTime });
    res.status(201).json({ message: "Booking request submitted", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin approves or rejects a booking
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) return res.status(400).json({ message: "Invalid status" });

    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();
    res.json({ message: `Booking ${status}`, booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bookings (admin view)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ include: [Equipment, Infrastructure] });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ where: { userId: req.user.id }, include: [Equipment, Infrastructure] });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
