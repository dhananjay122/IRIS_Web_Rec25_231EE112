const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, rollNumber, branch, password, role } = req.body;
    
    // Check if rollNumber already exists
    const existingUser = await User.findOne({ $or: [{ email }, { rollNumber }] });
    if (existingUser) {
      return res.status(400).json({ error: "Email or Roll number already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, rollNumber, branch, password: hashedPassword, role });
    
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Login User (Can use email or roll number)
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // Identifier can be rollNumber or email
    
    const user = await User.findOne({ 
      $or: [{ email: identifier }, { rollNumber: identifier }]
    });
    
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


