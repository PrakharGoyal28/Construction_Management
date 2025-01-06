import {asyncHandler} from "../utils/asyncHandler.js";
import { Report } from "../models/report.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Create a report
const createReport = asyncHandler(async (req, res) => {
  const { ProjectID, ReportType, GeneratedDate, Content } = req.body;

  // Validate required fields
  if (!ProjectID || !ReportType || !Content) {
    throw new ApiError(400, "ProjectID, ReportType, and Content are required.");
  }

  // Create a new report
  const report = await Report.create({
    ProjectID,
    ReportType,
    GeneratedDate: GeneratedDate || new Date(), // Default to the current date if not provided
    Content,
  });

  res.status(201).json(new ApiResponse(201, report, "Report created successfully."));
});

// Update a report
const updateReport = asyncHandler(async (req, res) => {
  const { reportId } = req.params;

  if (!reportId) {
    throw new ApiError(400, "Report ID is required.");
  }

  const updatedReport = await Report.findByIdAndUpdate(
    reportId,
    req.body,
    { new: true, runValidators: true } // Return updated document and validate inputs
  );

  if (!updatedReport) {
    throw new ApiError(404, "Report not found.");
  }

  res.status(200).json(new ApiResponse(200, updatedReport, "Report updated successfully."));
});

// Delete a report
const deleteReport = asyncHandler(async (req, res) => {
  const { reportId } = req.params;

  if (!reportId) {
    throw new ApiError(400, "Report ID is required.");
  }

  const deletedReport = await Report.findByIdAndDelete(reportId);

  if (!deletedReport) {
    throw new ApiError(404, "Report not found.");
  }

  res.status(200).json(new ApiResponse(200, null, "Report deleted successfully."));
});

// Get all reports by Project ID
const getReportsByProjectId = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(400, "Project ID is required.");
  }

  const reports = await Report.find({ ProjectID: projectId }).sort({ GeneratedDate: -1 });

  if (!reports || reports.length === 0) {
    throw new ApiError(404, "No reports found for the given Project ID.");
  }

  res.status(200).json(new ApiResponse(200, reports, `Reports for Project ID: ${projectId}`));
});

// Get all reports
const getAllReports = asyncHandler(async (req, res) => {
  const reports = await Report.find().sort({ GeneratedDate: -1 });

  if (!reports || reports.length === 0) {
    throw new ApiError(404, "No reports found.");
  }

  res.status(200).json(new ApiResponse(200, reports, "All reports retrieved successfully."));
});

export {
  createReport,
  updateReport,
  deleteReport,
  getReportsByProjectId,
  getAllReports,
};
