import express from "express";
import verifyToken from "../middleware/auth.js";

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
import { Login } from "../controllers/authorization.js";

const authorizationRouter = express.Router();
authorizationRouter.post("/login", Login);
const departmentRouter = express.Router();
const employeesRouter = express.Router();

departmentRouter.use(verifyToken);
employeesRouter.use(verifyToken);

departmentRouter.get("/", getAllDepUsers);
departmentRouter.get("/:id", getDepUsersById);
departmentRouter.post("/", createDepUsers);
departmentRouter.patch("/:id", updateDepUsers);
departmentRouter.delete("/:id", deleteDepUsers);

employeesRouter.get("/", getAllEmployeesUsers);
employeesRouter.get("/:id", getEmployeesUsersById);
employeesRouter.post("/", createEmployeesUsers);
employeesRouter.patch("/:id", updateEmployeesUsers);
employeesRouter.delete("/:id", deleteEmployeesUsers);

export { employeesRouter, departmentRouter, authorizationRouter };
