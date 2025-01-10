import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deletCloudinary, uploadCloudinary } from "../utils/cloudinary.js";4
import { Notification } from "../models/Notification.model.js";

const createTask = asyncHandler(async (req, res) => {
    const { TaskName, AssignedTo, Deadline, Status, Description, ProjectID, LabourRequired } = req.body;

    // Check required fields
    if (!TaskName || !ProjectID) {
        throw new ApiError(400, "TaskName and ProjectID are required.");
    }

    // Create a new task
    const newTask = await Task.create({
        TaskName,
        AssignedTo,
        Deadline,
        Status,
        Description,
        ProjectID,
        LabourRequired,
    });

    res.status(201).json(new ApiResponse(201, newTask, "Task created successfully."));
});

const updateTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { TaskName, AssignedTo, Deadline, Status, Description, ProjectID, LabourRequired } = req.body;

    // Check if taskId is provided
    if (!taskId) {
        throw new ApiError(400, "Task ID is required.");
    }

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        {
            TaskName,
            AssignedTo,
            Deadline,
            Status,
            Description,
            ProjectID,
            LabourRequired,
        },
        { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedTask) {
        throw new ApiError(404, "Task not found.");
    }

    res.status(200).json(new ApiResponse(200, updatedTask, "Task updated successfully."));
});
const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;

    // Check if taskId is provided
    if (!taskId) {
        throw new ApiError(400, "Task ID is required.");
    }

    // Find and delete the task
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
        throw new ApiError(404, "Task not found.");
    }

    res.status(200).json(new ApiResponse(200, deletedTask, "Task deleted successfully."));
});
const getTaskDetails = asyncHandler(async (req, res) => {
    const { taskId } = req.params;

    if (!taskId) {
        throw new ApiError(400, "Task ID is required.");
    }

    // Find the task by ID
    const task = await Task.findById(taskId)
        .populate("AssignedTo", "Name Email") // Populate user details (optional)
        .populate("ProjectID", "ProjectName") // Populate project details (optional)
        .exec();

    if (!task) {
        throw new ApiError(404, "Task not found.");
    }

    res.status(200).json(new ApiResponse(200, task, "Task details retrieved successfully."));
});
const createNotification = asyncHandler(async (req, res) => {
    const { taskId, Message, Type, Status } = req.body;
    const ImageLocalPath = req.files?.image[0]?.path;

    // Upload the image to Cloudinary if provided
    const ImageUrl = ImageLocalPath ? (await uploadCloudinary(ImageLocalPath)).url : null;
    const task = await Task.findById(taskId).select("AssignedTo");
    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    const notifications = await Notification.insertMany(
        task.AssignedTo.map((userId) => ({
            TaskID: taskId,
            Message,
            ImageUrl,
            Type,
            Status: Status || "Unread", 
            users: [userId], 
        }))
    );

    res.status(201).json(
        new ApiResponse(201, notifications, "Notifications created successfully for all assigned users.")
    );
});


export {
    createTask,
    updateTask,
    deleteTask,
    getTaskDetails,
    createNotification
}