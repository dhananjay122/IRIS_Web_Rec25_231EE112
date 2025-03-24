require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const equipmentRoutes = require("./routes/equipmentRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const equipmentRequestRoutes = require("./routes/equipmentRequestRoutes");
const infrastructureRoutes = require("./routes/infrastructureRoutes");
const infrastructureRequestRoutes = require("./routes/infrastructureRequestRoutes"); // Import infrastructure request routes
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(helmet());
app.use(morgan("dev"));

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/equipment-requests", equipmentRequestRoutes);
app.use("/api/infrastructure", infrastructureRoutes);
app.use("/api/infrastructure-requests", infrastructureRequestRoutes); // Add this line

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



