const EquipmentRequest = require("../models/EquipmentRequest");
const Equipment = require("../models/Equipment");

// Student submits equipment request
// Request Equipment
exports.requestEquipment = async (req, res) => {
  try {
    console.log("Request received:", req.body);

    const { rollNumber, equipmentName, quantity, duration } = req.body;

    if (!rollNumber || !equipmentName || !quantity || !duration) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the user has already requested equipment today
    const existingRequest = await EquipmentRequest.findOne({
      rollNumber,
      requestDate: { $gte: today }, // Check for requests made today
    });

    if (existingRequest) {
      return res.status(400).json({ error: "You can only request equipment once per day" });
    }

    // Find the requested equipment
    const equipment = await Equipment.findOne({ name: equipmentName });

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    if (equipment.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient quantity available" });
    }

    console.log("Equipment available:", equipment);

    // Create a new equipment request
    const newRequest = new EquipmentRequest({
      user: req.user.id, // Assuming authentication middleware attaches req.user
      rollNumber,
      equipmentName,
      quantity,
      duration,
      status: "pending",
      requestDate: new Date(), // Store request date
    });

    await newRequest.save();
    console.log("Equipment request created:", newRequest);

    res.status(201).json({ message: "Request submitted successfully", request: newRequest });
  } catch (error) {
    console.error("Server Error:", error.message, error.stack);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// Admin approves/rejects request
exports.reviewEquipmentRequest = async (req, res) => {
  try {
    const { requestId, status, reason } = req.body;

    // Validate status
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Find request
    const request = await EquipmentRequest.findById(requestId).populate("equipment");
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // If approving, check equipment availability
    if (status === "approved") {
      const equipment = request.equipment;
      if (equipment.quantity < request.quantity) {
        return res.status(400).json({ error: "Not enough equipment available" });
      }

      // Deduct quantity
      equipment.quantity -= request.quantity;
      await equipment.save();
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

// Get all requests (Student/Admin)
exports.getRequests = async (req, res) => {
  try {
    console.log("Fetching requests for user:", req.user);
    
    let requests;
    if (req.user.role === "admin") {
      requests = await EquipmentRequest.find(); // Admin sees all requests
    } else {
      requests = await EquipmentRequest.find({ user: req.user._id });
    }

    console.log("Fetched Requests:", requests); // Debugging
    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

