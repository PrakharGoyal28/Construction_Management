import {asyncHandler} from "../utils/asyncHandler.js";
import { Approval } from "../models/approval.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

// Create an approval record
const createApproval = asyncHandler(async (req, res) => {
  const { TaskID, Status } = req.body;

  // Validate required fields
  if (!TaskID || !Status) {
    throw new ApiError(400, "TaskID and Status are required.");
  }

  // Create a new approval record
  const approval = await Approval.create({ TaskID, Status });

  res.status(201).json(new ApiResponse(201, approval, "Approval record created successfully."));
});

// Update an approval record
const updateApproval = asyncHandler(async (req, res) => {
  const { approvalId } = req.params;

  if (!approvalId) {
    throw new ApiError(400, "Approval ID is required.");
  }

  const updatedApproval = await Approval.findByIdAndUpdate(
    approvalId,
    req.body,
    { new: true, runValidators: true } // Return updated document and validate inputs
  );

  if (!updatedApproval) {
    throw new ApiError(404, "Approval record not found.");
  }

  res.status(200).json(new ApiResponse(200, updatedApproval, "Approval record updated successfully."));
});

// Delete an approval record
const deleteApproval = asyncHandler(async (req, res) => {
  const { approvalId } = req.params;

  if (!approvalId) {
    throw new ApiError(400, "Approval ID is required.");
  }

  const deletedApproval = await Approval.findByIdAndDelete(approvalId);

  if (!deletedApproval) {
    throw new ApiError(404, "Approval record not found.");
  }

  res.status(200).json(new ApiResponse(200, null, "Approval record deleted successfully."));
});

// Get all approvals for a Task ID
const getApprovalsByTaskId = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!taskId) {
    throw new ApiError(400, "Task ID is required.");
  }

  const approvals = await Approval.find({ TaskID: taskId });

  if (!approvals || approvals.length === 0) {
    throw new ApiError(404, "No approvals found for the given Task ID.");
  }

  res.status(200).json(new ApiResponse(200, approvals, `Approvals for Task ID: ${taskId}`));
});

export {
  createApproval,
  updateApproval,
  deleteApproval,
  getApprovalsByTaskId,
};
