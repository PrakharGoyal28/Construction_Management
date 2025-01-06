import express from "express";
import {
  createApproval,
  updateApproval,
  deleteApproval,
  getApprovalsByTaskId,
} from "../controllers/approval.controller.js";

const router = express.Router();

// Route to create an approval record
router.post("/create", createApproval);

// Route to update an approval record
router.put("/update/:approvalId", updateApproval);

// Route to delete an approval record
router.delete("/delete/:approvalId", deleteApproval);

// Route to get all approvals by Task ID
router.get("/task/:taskId", getApprovalsByTaskId);

export default router;
