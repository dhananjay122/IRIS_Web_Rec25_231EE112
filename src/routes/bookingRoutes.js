const express = require("express");
const router = express.Router();
const { 
  requestBooking, 
  approveBooking, 
  rejectBooking, 
  cancelBooking, 
  getUserBookings 
} = require("../controllers/bookingController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// Request a new booking (only authenticated users)
router.post("/request", protect, requestBooking);

// Get user bookings (only authenticated users)
router.get("/my-bookings", protect, getUserBookings);

// Approve a booking request (only admin)
router.put("/approve/:requestId", protect, isAdmin, approveBooking);

// Reject a booking request with admin comments (only admin)
router.put("/reject/:requestId", protect, isAdmin, rejectBooking);

// Cancel a booking (only authenticated users)
router.put("/cancel/:requestId", protect, cancelBooking);

module.exports = router;



