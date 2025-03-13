const express = require("express");
const { createBooking, updateBookingStatus, getAllBookings, getUserBookings } = require("../controllers/bookingController");
const authMiddleware= require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.get("/", authMiddleware, getUserBookings);
router.get("/all", authMiddleware, getAllBookings);
router.put("/:id", authMiddleware, updateBookingStatus);

module.exports = router;
