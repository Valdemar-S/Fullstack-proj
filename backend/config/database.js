import { Sequelize } from "sequelize";

const db = new Sequelize("departments", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
