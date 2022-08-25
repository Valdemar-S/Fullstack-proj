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

const router = express.Router();

router.get("/", getAllDepUsers);
router.get("/:id", getDepUsersById);
router.post("/", createDepUsers);
router.patch("/:id", updateDepUsers);
router.delete("/:id", deleteDepUsers);

router.get("/", getAllEmployeesUsers);
router.get("/:id", getEmployeesUsersById);
router.post("/", createEmployeesUsers);
router.patch("/:id", updateEmployeesUsers);
router.delete("/:id", deleteEmployeesUsers);

export default router;
