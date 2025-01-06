import express from "express";
import {
  createReport,
  updateReport,
  deleteReport,
  getReportsByProjectId,
  getAllReports,
} from "../controllers/report.controller.js";

const router = express.Router();

// Route to create a report
router.post("/create", createReport);

// Route to update a report
router.put("/update/:reportId", updateReport);

// Route to delete a report
router.delete("/delete/:reportId", deleteReport);

// Route to get all reports by Project ID
router.get("/project/:projectId", getReportsByProjectId);

// Route to get all reports
router.get("/all", getAllReports);

export default router;
