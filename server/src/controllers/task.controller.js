import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";

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

    res.status(201).json(new ApiResponce(201, newTask, "Task created successfully."));
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

    res.status(200).json(new ApiResponce(200, updatedTask, "Task updated successfully."));
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

    res.status(200).json(new ApiResponce(200, deletedTask, "Task deleted successfully."));
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
  
    res.status(200).json(new ApiResponce(200, task, "Task details retrieved successfully."));
  });

export{
    createTask,
    updateTask,
    deleteTask,
    getTaskDetails
}