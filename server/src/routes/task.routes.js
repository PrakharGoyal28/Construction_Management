import express from "express";
import {
    createTask,
    updateTask,
    deleteTask,
    getTaskDetails,
    getTaskByDate,
    getAllTasks,

} from "../controllers/task.controller.js"



const router = express.Router();

router.post("/create", createTask);

// Route to update an existing task
router.put("/update/:taskId", updateTask);

// Route to delete a task by ID
router.delete("/delete/:taskId", deleteTask);

// Route to get task details by ID
router.get("/:taskId", getTaskDetails);

router.get("/info/:date",getTaskByDate);

router.get("/all/abc",getAllTasks)



export default router;