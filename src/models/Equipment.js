const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Equipment = sequelize.define("Equipment", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  available: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },  // Number available for booking
  condition: { type: DataTypes.ENUM("new", "good", "damaged"), defaultValue: "good" },
});

module.exports = Equipment;
