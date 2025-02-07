import { Task } from "../models/Task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deletCloudinary, uploadCloudinary } from "../utils/cloudinary.js";
import { Notification } from "../models/Notification.model.js";

const createTask = asyncHandler(async (req, res) => {
    const { TaskName, AssignedTo, Starttime, Deadline, Status, Description, ProjectID, LabourRequired, Prerequisites } = req.body;
    // Check required fields
    if (!TaskName) {
        throw new ApiError(400, "TaskName and ProjectID are required.");
    }
    let upload_url=null; 
    if (req.file) {
        const imagePath = req.file.path;
        const upload = await uploadCloudinary(imagePath);
  
        if (!upload) {
          throw new ApiError(500, "Failed to upload photo to Cloudinary");
        }
  
        upload_url = upload.url;
      }

    // Create a new task
    const newTask = await Task.create({
        TaskName,
        AssignedTo,
        Starttime,
        Deadline,
        Status,
        Description,
        ProjectID,
        LabourRequired,
        Prerequisites,
        ImageUrl:upload_url
    });

    res.status(201).json(new ApiResponse(201, { taskId: newTask._id, ...newTask._doc }, "Task created successfully."));
});

// const updateTask = asyncHandler(async (req, res) => {
//     const { taskId } = req.params;
//     const { TaskName, AssignedTo, Starttime,Deadline, Status, Description, ProjectID, LabourRequired,Prerequisites } = req.body;

//     // Check if taskId is provided
//     if (!taskId) {
//         throw new ApiError(400, "Task ID is required.");
//     }

//     const existingTask = await Task.findById(taskId);
//     if (!existingTask) {
//         throw new ApiError(404, "Task not found.");
//     }

//     // Update the task
//     const updatedTask = await Task.findByIdAndUpdate(
//         taskId,
//         {
//             TaskName,
//             AssignedTo,
//             Starttime,
//             Deadline,
//             Status,
//             Description,
//             ProjectID,
//             LabourRequired,
//             Prerequisites,
//         },
//         { new: true, runValidators: true } // Return the updated document and run validation
//     );

//     if (!updatedTask) {
//         throw new ApiError(404, "Task not found.");
//     }

//     res.status(200).json(new ApiResponse(200, updatedTask, "Task updated successfully."));
// });

const updateTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { TaskName, AssignedTo, Starttime, Deadline, Status, Description, ProjectID, LabourRequired, Prerequisites } = req.body;

    if (!taskId) {
        throw new ApiError(400, "Task ID is required.");
    }

    // Find the existing task
    const existingTask = await Task.findById(taskId).populate('Prerequisites');
    if (!existingTask) {
        throw new ApiError(404, "Task not found.");
    }

    // Calculate the delay in the Deadline or Starttime
    let delayInDays = 0;
    if (Deadline && new Date(Deadline).getTime() !== existingTask.Deadline?.getTime()) {
        const oldDeadline = existingTask.Deadline ? new Date(existingTask.Deadline) : new Date();
        const newDeadline = new Date(Deadline);
        delayInDays = Math.ceil((newDeadline - oldDeadline) / (1000 * 60 * 60 * 24)); // Convert ms to days
    }

    // Update the current task
    const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { TaskName, AssignedTo, Starttime, Deadline, Status, Description, ProjectID, LabourRequired, Prerequisites },
        { new: true, runValidators: true }
    );

    // If there is a delay, propagate it to dependent tasks
    if (delayInDays !== 0) {
        await propagateDelay(taskId, delayInDays);
    }

    res.status(200).json(new ApiResponse(200, updatedTask, "Task updated successfully."));
});

// Function to propagate delay to dependent tasks
const propagateDelay = async (taskId, delayInDays) => {
    const queue = [taskId];
    while (queue.length > 0) {
        const currentTaskId = queue.shift();

        // Find tasks dependent on the current task
        const dependentTasks = await Task.find({ Prerequisites: currentTaskId });

        for (const dependentTask of dependentTasks) {
            // Calculate new Starttime and Deadline
            const newStarttime = dependentTask.Starttime
                ? new Date(new Date(dependentTask.Starttime).getTime() + delayInDays * 24 * 60 * 60 * 1000)
                : null;

            const newDeadline = dependentTask.Deadline
                ? new Date(new Date(dependentTask.Deadline).getTime() + delayInDays * 24 * 60 * 60 * 1000)
                : null;

            // Update the dependent task
            await Task.findByIdAndUpdate(
                dependentTask._id,
                { Starttime: newStarttime, Deadline: newDeadline },
                { new: true, runValidators: true }
            );

            // Add the dependent task to the queue for further propagation
            queue.push(dependentTask._id);
        }
    }
};

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

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        // Send tasks as the response
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Failed to fetch tasks." });
    }
}

const getTaskByDate = async (req, res) => {
    try {
        console.log("hello");

        const { date } = req.params;

        // Parse the date parameter into a Date object
        const targetDate = new Date(date);

        // Find tasks where the target date is between Starttime and Deadline
        const tasks = await Task.find({
            Starttime: { $lte: targetDate }, // Starttime is less than or equal to the target date
            Deadline: { $gte: targetDate }, // Deadline is greater than or equal to the target date
        }).populate('AssignedTo').populate('ProjectID').populate('Prerequisites');

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Failed to fetch tasks', error });
    }
}
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

const getTaskDetailsNew = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('AssignedTo', 'name'); // Fetch only name and image
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching task details' });
    }
};



export {
    createTask,
    updateTask,
    deleteTask,
    getTaskDetails,
    createNotification,
    getTaskByDate,
    getAllTasks,
    getTaskDetailsNew,
}