import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const DepUsers = db.define(
  "department_head",
  {
    department_name: {
      type: DataTypes.STRING,
    },
    department_head: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default DepUsers;
