import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const EmployeesUsers = db.define(
  "employees",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    password: {
      type: DataTypes.STRING,
    },
    departments_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default EmployeesUsers;
