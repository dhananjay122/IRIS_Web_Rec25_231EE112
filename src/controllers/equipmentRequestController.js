const EquipmentRequest = require("../models/EquipmentRequest");
const Equipment = require("../models/Equipment");

// Student submits equipment request
// Request Equipment
exports.requestEquipment = async (req, res) => {
    try {
      const { rollNumber, equipmentName, quantity } = req.body;
  
      // Find the user using rollNumber
      const user = await User.findOne({ rollNumber });
      if (!user) return res.status(404).json({ error: "User not found" });
  
      // Find the requested equipment
      const equipment = await Equipment.findOne({ name: equipmentName });
      if (!equipment || equipment.quantity < quantity) {
        return res.status(400).json({ error: "Insufficient quantity or equipment not available" });
      }
  
      // Create the booking request
      const newBooking = new Booking({
        userId: user._id,
        itemType: "equipment",
        itemId: equipment._id,
        quantity,
        status: "pending",
      });
  
      await newBooking.save();
      res.status(201).json({ message: "Request submitted successfully", newBooking });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
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
    let filter = {};
    if (req.user.role === "student") {
      filter.student = req.user.id;
    }

    const requests = await EquipmentRequest.find(filter)
      .populate("student", "name email")
      .populate("equipment", "name category")
      .sort({ requestDate: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
