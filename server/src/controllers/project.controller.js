import { Project } from "../models/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { addUserToChatRoom, createChatRoom } from "./chat.controller.js";

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
        team: [UserID],
    });
    
    await createChatRoom(newProject._id, ProjectName, [UserID]);

    res.status(201).json(new ApiResponse(201, newProject, "Project added successfully."));
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

    res.status(200).json(new ApiResponse(200, deletedProject, "Project deleted successfully."));
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

    res.status(200).json(new ApiResponse(200, updatedProject, "Project updated successfully."));
});

const getProjectDetails = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (!projectId) {
        throw new ApiError(400, "Project ID is required.");
    }

    // Find the project by ID
    const project = await Project.findById(projectId)
        .populate("UserID", "Name Email") // Populate user details (optional)
        .exec();

    if (!project) {
        throw new ApiError(404, "Project not found.");
    }

    res.status(200).json(new ApiResponse(200, project, "Project details retrieved successfully."));
});

const addUserToTeam = asyncHandler(async (req, res) => {
    const { projectId, email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Find the project
    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Check if the user is already in the team
    if (project.team.includes(user._id.toString())) {
        throw new ApiError(400, "User is already a part of the team");
    }

    // Add user to the team
    project.team.push(user._id);
    await project.save();
    await addUserToChatRoom(projectId, user._id.toString());

    res.status(200).json(new ApiResponse(200, project, "User added to the team successfully"));
});

const removeUserFromTeam = asyncHandler(async (req, res) => {
    const { projectId, email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Find the project
    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Check if the user is in the team
    if (!project.team.includes(user._id.toString())) {
        throw new ApiError(400, "User is not a part of the team");
    }

    // Remove user from the team
    project.team = project.team.filter((memberId) => memberId.toString() !== user._id.toString());
    await project.save();
    await removeUserFromChatRoom(projectId, user._id.toString());
    res.status(200).json(new ApiResponse(200, project, "User removed from the team successfully"));
});

export {
    addProject,
    deleteProject,
    updateProject,
    getProjectDetails
};