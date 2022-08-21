import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const DepUsers = db.define(
  "departments",
  {
    name: {
      type: DataTypes.STRING,
    },
    head: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default DepUsers;
