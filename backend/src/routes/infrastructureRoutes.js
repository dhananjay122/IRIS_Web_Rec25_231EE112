const express = require("express");
const router = express.Router();
const { addInfrastructure, updateInfrastructure, getAllInfrastructure } = require("../controllers/infrastructureController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// Add new infrastructure (Admin only)
router.post("/add", protect, isAdmin, addInfrastructure);

// Update infrastructure (Admin only)
router.put("/update", protect, isAdmin, updateInfrastructure);

// Get all infrastructures
router.get("/", getAllInfrastructure);

module.exports = router;

