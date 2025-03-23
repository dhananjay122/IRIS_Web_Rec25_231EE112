require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const equipmentRoutes = require("./routes/equipmentRoutes");
const userRoutes=require("./routes/userRoutes");
const bookingRoutes=require("./routes/bookingRoutes");
const equipmentRequestRoutes = require("./routes/equipmentRequestRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/bookings",bookingRoutes );
app.use("/api/equipment-requests", equipmentRequestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


