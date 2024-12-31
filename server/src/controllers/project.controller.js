import asyncHandler from "express-async-handler";
import { Project } from "../models/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";


const addProject = asyncHandler(async (req, res) => {
    const { ProjectName, UserID, StartDate, EndDate, TotalBudget, Status, Description } = req.body;

    // Check for required fields
    if (!ProjectName || !UserID) {
        throw new ApiError(400, "ProjectName and UserID are required.");
    }

    // Create a new project
    const newProject = await Project.create({
        ProjectName,
        UserID,
        StartDate,
        EndDate,
        TotalBudget,
        Status,
        Description,
    });

    res.status(201).json(new ApiResponce(201, newProject, "Project added successfully."));
});

const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    // Check if projectId is provided
    if (!projectId) {
        throw new ApiError(400, "Project ID is required.");
    }

    // Find and delete the project
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
        throw new ApiError(404, "Project not found.");
    }

    res.status(200).json(new ApiResponce(200, deletedProject, "Project deleted successfully."));
});

const updateProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { ProjectName, UserID, StartDate, EndDate, TotalBudget, Status, Description } = req.body;

    // Check if projectId is provided
    if (!projectId) {
        throw new ApiError(400, "Project ID is required.");
    }

    // Update the project
    const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        {
            ProjectName,
            UserID,
            StartDate,
            EndDate,
            TotalBudget,
            Status,
            Description,
        },
        { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedProject) {
        throw new ApiError(404, "Project not found.");
    }

    res.status(200).json(new ApiResponce(200, updatedProject, "Project updated successfully."));
});

export {
    addProject,
    deleteProject,
    updateProject
};