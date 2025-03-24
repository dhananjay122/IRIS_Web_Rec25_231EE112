const express = require("express");
const router = express.Router();
const { requestEquipment, reviewEquipmentRequest, getRequests } = require("../controllers/equipmentRequestController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// Student requests equipment
router.post("/request", protect, requestEquipment);

// Admin approves/rejects requests
router.put("/review", protect, isAdmin, reviewEquipmentRequest);

// Get all equipment requests (Students see their own, Admins see all)
router.get("/", protect, getRequests);

module.exports = router;
