import express from "express";
import {
  createProjectFinance,
  updateProjectFinance,
  deleteProjectFinance,
  getProjectFinanceByProjectId,
} from "../controllers/projectFinance.controller.js";

const router = express.Router();

// Route to create project finance
router.post("/create", createProjectFinance);

// Route to update project finance by ID
router.put("/update/:financeId", updateProjectFinance);

// Route to delete project finance by ID
router.delete("/delete/:financeId", deleteProjectFinance);

// Route to get project finance by Project ID
router.get("/project/:projectId", getProjectFinanceByProjectId);

export default router;
