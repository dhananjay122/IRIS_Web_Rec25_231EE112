const InfrastructureRequest = require("../models/infrastructureRequest");

// Student submits infrastructure request
exports.requestInfrastructure = async (req, res) => {
  try {
    console.log("Infrastructure Request received:", req.body);

    const { rollNumber, infrastructureName, duration } = req.body;

    if (!rollNumber || !infrastructureName || !duration) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create the infrastructure request
    const newRequest = new InfrastructureRequest({
      rollNumber,
      infrastructureName,
      duration,
      status: "pending",
    });

    await newRequest.save();
    console.log("Infrastructure request created:", newRequest);

    res.status(201).json({ message: "Request submitted successfully", newRequest });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Admin approves/rejects infrastructure request
exports.reviewInfrastructureRequest = async (req, res) => {
  try {
    const { requestId, status, reason } = req.body;

    // Validate status
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Find request
    const request = await InfrastructureRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Update request
    request.status = status;
    if (reason) request.reason = reason;
    await request.save();

    res.json({ message: `Request ${status}`, request });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get all infrastructure requests (Students/Admin)
exports.getInfrastructureRequests = async (req, res) => {
  try {
    let filter = {};

    // If the user is a student, filter requests by their roll number
    if (req.user.role === "student") {
      filter.rollNumber = req.user.rollNumber;
    }

    const requests = await InfrastructureRequest.find(filter).sort({ requestDate: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
