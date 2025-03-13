require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes.js");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const sequelize = require("./config/db");

