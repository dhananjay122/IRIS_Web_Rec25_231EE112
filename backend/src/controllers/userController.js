const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, rollNumber, branch, password, role } = req.body;

    // Check if email or rollNumber already exists
    const existingUser = await User.findOne({ $or: [{ email }, { rollNumber }] });
    if (existingUser) {
      return res.status(400).json({ error: "Email or Roll number already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ 
      name, 
      email, 
      rollNumber, 
      branch, 
      password: hashedPassword, 
      role 
    });

    await newUser.save();

    res.status(201).json({ 
      message: "User registered successfully", 
      user: { name, email, rollNumber, branch, role } // Send user details (without password)
    });

  } catch (error) {
    console.error("Registration Error:", error); 
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// Login User (Can use email or roll number)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.json({ 
      message: "Login successful", 
      token, 
      user: { id: user._id, name: user.name, email: user.email, branch: user.branch, role: user.role } 
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};




