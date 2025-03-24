const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure User model is imported

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    console.log("Received Token:", token); // Debugging line

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging line

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next(); // Proceed to the next middleware/route
  } catch (error) {
    console.error("JWT Verification Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token. Please log in again." });
    }

    res.status(401).json({ message: "Authentication failed" });
  }
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. No user data found." });
  }

  if (req.user.role === "admin") {
    next(); // Allow access
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = { protect, isAdmin };
