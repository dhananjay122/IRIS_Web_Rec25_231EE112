const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Infrastructure = sequelize.define("Infrastructure", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  capacity: { type: DataTypes.INTEGER, allowNull: false },
  availability: { type: DataTypes.BOOLEAN, defaultValue: true },
  operatingHours: { type: DataTypes.STRING, allowNull: false }, // Example: "06:00-22:00"
});

module.exports = Infrastructure;
