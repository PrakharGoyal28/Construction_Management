import {asyncHandler} from "../utils/asyncHandler.js";
import { ProjectFinance } from "../models/ProjectFinance.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

// Create Project Finance
const createProjectFinance = asyncHandler(async (req, res) => {
  const { ProjectID, TotalBudget, RemainingBudget, CostBreakdown, RecentTransactions } = req.body;

  if (!ProjectID || !TotalBudget) {
    throw new ApiError(400, "ProjectID and TotalBudget are required.");
  }

  const newProjectFinance = await ProjectFinance.create({
    ProjectID,
    TotalBudget,
    RemainingBudget: RemainingBudget || TotalBudget, // Default to TotalBudget if not provided
    CostBreakdown,
    RecentTransactions,
  });

  res.status(201).json(new ApiResponse(201, newProjectFinance, "Project finance created successfully."));
});

// Update Project Finance
const updateProjectFinance = asyncHandler(async (req, res) => {
  const { financeId } = req.params;

  if (!financeId) {
    throw new ApiError(400, "Finance ID is required.");
  }

  const updatedFinance = await ProjectFinance.findByIdAndUpdate(
    financeId,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedFinance) {
    throw new ApiError(404, "Project finance not found.");
  }

  res.status(200).json(new ApiResponse(200, updatedFinance, "Project finance updated successfully."));
});

// Delete Project Finance
const deleteProjectFinance = asyncHandler(async (req, res) => {
  const { financeId } = req.params;

  if (!financeId) {
    throw new ApiError(400, "Finance ID is required.");
  }

  const deletedFinance = await ProjectFinance.findByIdAndDelete(financeId);

  if (!deletedFinance) {
    throw new ApiError(404, "Project finance not found.");
  }

  res.status(200).json(new ApiResponse(200, null, "Project finance deleted successfully."));
});

// Get Project Finance by ProjectID
const getProjectFinanceByProjectId = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(400, "Project ID is required.");
  }

  const projectFinance = await ProjectFinance.findOne({ ProjectID: projectId });

  if (!projectFinance) {
    throw new ApiError(404, "Project finance details not found for the given Project ID.");
  }

  res.status(200).json(new ApiResponse(200, projectFinance, `Finance details for Project ID: ${projectId}`));
});

export {
  createProjectFinance,
  updateProjectFinance,
  deleteProjectFinance,
  getProjectFinanceByProjectId,
};
