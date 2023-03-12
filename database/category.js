const sequelize = require(".");
const { DataTypes } = require("sequelize");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    desciption: DataTypes.TEXT,
  },
  { timestamps: true, paranoid: true }
);

module.exports = Category;
