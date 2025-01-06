import express from "express";
import {
  createNotification,
  updateNotification,
  deleteNotification,
  getNotificationsByTaskId,
  getAllNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

// Route to create a notification
router.post("/create", createNotification);

// Route to update a notification
router.put("/update/:notificationId", updateNotification);

// Route to delete a notification
router.delete("/delete/:notificationId", deleteNotification);

// Route to get notifications by Task ID
router.get("/task/:taskId", getNotificationsByTaskId);

// Route to get all notifications
router.get("/all", getAllNotifications);

export default router;
