const express = require("express");
const router = express.Router();
const { addEquipment,updateEquipment} = require("../controllers/equipmentController");

// Update equipment details (Admin only)
router.post("/add", addEquipment);


router.put("/update", updateEquipment);
module.exports = router;

