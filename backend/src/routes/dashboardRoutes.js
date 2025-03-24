const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");
const Infrastructure = require("../models/Infrastructure");

// Get all available equipment and infrastructure
router.get("/", async (req, res) => {
  try {
    const availableEquipments = await Equipment.find({ status: "available" });
    const availableInfrastructure = await Infrastructure.find({ status: "available" });

    res.json({
      equipments: availableEquipments,
      infrastructures: availableInfrastructure,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
