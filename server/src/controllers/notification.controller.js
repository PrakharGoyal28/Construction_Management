import {asyncHandler} from "../utils/asyncHandler.js";
import { Notification } from "../models/notification.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Create a notification
const createNotification = asyncHandler(async (req, res) => {
  const { TaskID, Message, Type, Status, Date } = req.body;

  // Validate required fields
  if (!TaskID || !Message || !Type || !Status) {
    throw new ApiError(400, "TaskID, Message, Type, and Status are required.");
  }

  // Create a new notification
  const notification = await Notification.create({
    TaskID,
    Message,
    Type,
    Status,
    Date: Date || new Date(), // Default to the current date if not provided
  });

  res.status(201).json(new ApiResponse(201, notification, "Notification created successfully."));
});

// Update a notification
const updateNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  if (!notificationId) {
    throw new ApiError(400, "Notification ID is required.");
  }

  const updatedNotification = await Notification.findByIdAndUpdate(
    notificationId,
    req.body,
    { new: true, runValidators: true } // Return updated document and validate inputs
  );

  if (!updatedNotification) {
    throw new ApiError(404, "Notification not found.");
  }

  res.status(200).json(new ApiResponse(200, updatedNotification, "Notification updated successfully."));
});

// Delete a notification
const deleteNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  if (!notificationId) {
    throw new ApiError(400, "Notification ID is required.");
  }

  const deletedNotification = await Notification.findByIdAndDelete(notificationId);

  if (!deletedNotification) {
    throw new ApiError(404, "Notification not found.");
  }

  res.status(200).json(new ApiResponse(200, null, "Notification deleted successfully."));
});

// Get notifications by Task ID
const getNotificationsByTaskId = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!taskId) {
    throw new ApiError(400, "Task ID is required.");
  }

  const notifications = await Notification.find({ TaskID: taskId }).sort({ Date: -1 });

  if (!notifications || notifications.length === 0) {
    throw new ApiError(404, "No notifications found for the given Task ID.");
  }

  res.status(200).json(new ApiResponse(200, notifications, `Notifications for Task ID: ${taskId}`));
});

// Get all notifications
const getAllNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find().sort({ Date: -1 });

  if (!notifications || notifications.length === 0) {
    throw new ApiError(404, "No notifications found.");
  }

  res.status(200).json(new ApiResponse(200, notifications, "All notifications retrieved successfully."));
});

export {
  createNotification,
  updateNotification,
  deleteNotification,
  getNotificationsByTaskId,
  getAllNotifications,
};
