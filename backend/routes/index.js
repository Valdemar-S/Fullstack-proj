import express from "express";

import {
  getAllDepUsers,
  createDepUsers,
  getDepUsersById,
  updateDepUsers,
  deleteDepUsers,
} from "../controllers/department.js";
import {
  getAllEmployeesUsers,
  createEmployeesUsers,
  getEmployeesUsersById,
  updateEmployeesUsers,
  deleteEmployeesUsers,
} from "../controllers/employees.js";

const departmentRouter = express.Router();

departmentRouter.get("/", getAllDepUsers);
departmentRouter.get("/:id", getDepUsersById);
departmentRouter.post("/", createDepUsers);
departmentRouter.patch("/:id", updateDepUsers);
departmentRouter.delete("/:id", deleteDepUsers);

const employeesRouter = express.Router();

employeesRouter.get("/", getAllEmployeesUsers);
employeesRouter.get("/:id", getEmployeesUsersById);
employeesRouter.post("/", createEmployeesUsers);
employeesRouter.patch("/:id", updateEmployeesUsers);
employeesRouter.delete("/:id", deleteEmployeesUsers);

export { employeesRouter, departmentRouter };
