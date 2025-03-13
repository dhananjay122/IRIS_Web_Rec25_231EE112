const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Equipment = require("./Equipment");
const Infrastructure = require("./Infrastructure");

const Booking = sequelize.define("Booking", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: "id" } },
  equipmentId: { type: DataTypes.UUID, allowNull: true, references: { model: Equipment, key: "id" } },
  infraId: { type: DataTypes.UUID, allowNull: true, references: { model: Infrastructure, key: "id" } },
  date: { type: DataTypes.DATEONLY, allowNull: false },  // Booking date
  startTime: { type: DataTypes.TIME, allowNull: false },  // Start time
  endTime: { type: DataTypes.TIME, allowNull: false },  // End time
  status: { type: DataTypes.ENUM("pending", "approved", "rejected"), defaultValue: "pending" },
});

Booking.belongsTo(User, { foreignKey: "userId" });
Booking.belongsTo(Equipment, { foreignKey: "equipmentId", allowNull: true });
Booking.belongsTo(Infrastructure, { foreignKey: "infraId", allowNull: true });

module.exports = Booking;
