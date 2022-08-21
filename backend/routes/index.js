import express from "express";

import {
  getAllDepUsers,
  createDepUsers,
  getDepUsersById,
  updateDepUsers,
  deleteDepUsers,
} from "../controllers/department.js";

const router = express.Router();

router.get("/", getAllDepUsers);
router.get("/:id", getDepUsersById);
router.post("/", createDepUsers);
router.patch("/:id", updateDepUsers);
router.delete("/:id", deleteDepUsers);

export default router;
