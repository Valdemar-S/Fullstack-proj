import { Sequelize } from "sequelize";

const db = new Sequelize("myDb", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
