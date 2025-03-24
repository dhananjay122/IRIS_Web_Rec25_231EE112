const express = require("express");
const router = express.Router();
const { 
  requestInfrastructure, 
  reviewInfrastructureRequest, 
  getInfrastructureRequests 
} = require("../controllers/infrastructureRequestcontroller");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// Student requests infrastructure
router.post("/request", protect, requestInfrastructure);

// Admin approves/rejects requests
router.put("/review", protect, isAdmin, reviewInfrastructureRequest);

// Get all infrastructure requests (Students see their own, Admins see all)
router.get("/", protect, getInfrastructureRequests);

module.exports = router;