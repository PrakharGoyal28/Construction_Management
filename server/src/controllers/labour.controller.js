import { Labour } from "../models/labour.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const registerLabour = asyncHandler(async (req, res) => {
    const { name, Contact, Type, ProjectID, Rate, TaskID } = req.body;

    // Validate required fields
    if (!name ) {
        throw new ApiError(400, "All fields are required");
    }

    // Create a new labour document
    const newLabour = new Labour({
        name,
        Contact,
        Type,
        ProjectID,
        Rate,
        TaskID,
        Attendance: [] // Initialize with an empty attendance array
    });

    // Save the labourer to the database
    const savedLabour = await newLabour.save();

    if (savedLabour) {
        return res
            .status(201)
            .json(new ApiResponse(201, savedLabour, "Labour registered successfully"));
    } else {
        throw new ApiError(500, "Something went wrong while creating the labour");
    }
});


const updateAttendance = asyncHandler(async (req, res) => {
    const { labourId, date, status, remarks } = req.body;

    if (!labourId || !date || !status) {
        throw new ApiError(400, "Labour ID, Date, and Status are required");
    }

    const attendanceDate = new Date(date);

    // Validate the status
    if (!["Present", "Absent"].includes(status)) {
        throw new ApiError(400, "Status must be either 'Present' or 'Absent'");
    }

    // Check if the labour exists
    const labour = await Labour.findById(labourId);
    if (!labour) {
        throw new ApiError(404, "Labour not found");
    }

    // Check if an attendance entry for the given date already exists
    const existingAttendance = labour.Attendance.find(
        (entry) => entry.date.toISOString().split("T")[0] === attendanceDate.toISOString().split("T")[0]
    );

    if (existingAttendance) {
        // Update the existing attendance entry
        existingAttendance.status = status;
        if (remarks) {
            existingAttendance.remarks = remarks;
        }
    } else {
        // Add a new attendance entry
        labour.Attendance.push({
            date: attendanceDate,
            status,
            remarks,
        });
    }

    // Save the updated labour document
    const updatedLabour = await labour.save();

    return res.status(200).json(
        new ApiResponse(200, updatedLabour, "Attendance updated successfully")
    );
});
const getLabourDetails = asyncHandler(async (req, res) => {
    const { labourId } = req.params;
    let { startDate, endDate } = req.query; // Optional filters for attendance range

    if (!labourId) {
        throw new ApiError(400, "Labour ID is required");
    }

    // Set default dates if not provided
    const today = new Date();
    if (!startDate) {
        const oneWeekBefore = new Date();
        oneWeekBefore.setDate(today.getDate() - 7);
        startDate = oneWeekBefore.toISOString().split("T")[0];
    }
    if (!endDate) {
        endDate = today.toISOString().split("T")[0];
    }

    // Fetch the labour document with all the necessary fields
    const labour = await Labour.findById(labourId)
        .select("name Contact Type ProjectID Rate TaskID Attendance") // Select specific fields to return
        .exec();

    if (!labour) {
        throw new ApiError(404, "Labour not found");
    }

    // Get attendance history and build a date range
    const recordedDates = labour.Attendance.map((entry) =>
        entry.date.toISOString().split("T")[0]
    );

    // Build an array of all dates in the range
    const start = new Date(startDate);
    const end = new Date(endDate);

    const dateRange = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dateRange.push(new Date(d).toISOString().split("T")[0]);
    }

    // Check for missing dates and add absent entries
    const missingDates = dateRange.filter((date) => !recordedDates.includes(date));

    missingDates.forEach((date) => {
        labour.Attendance.push({
            date: new Date(date),
            status: "Absent",
            remarks: "Automatically marked as absent",
        });
    });

    // Save the updated labour document with attendance added
    await labour.save();

    // Return both the current status (attendance) and all other information
    return res.status(200).json(
        new ApiResponse(200, {
            labour: {
                name: labour.name,
                Contact: labour.Contact,
                Type: labour.Type,
                ProjectID: labour.ProjectID,
                Rate: labour.Rate,
                TaskID: labour.TaskID,
                Attendance: labour.Attendance, // All attendance details
            },
        }, `Attendance history for ${labour.name}`)
    );
});

const getLaboursByProjectId = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (!projectId) {
        throw new ApiError(400, "Project ID is required");
    }

    // Find all labours associated with the given ProjectID
    const labours = await Labour.find({ ProjectID: projectId });

    if (!labours || labours.length === 0) {
        throw new ApiResponse(404, "No labours found for the given Project ID");
    }

    return res.status(200).json(
        new ApiResponse(200, labours, `Labours for project ${projectId} retrieved successfully`)
    );
});


const updateTaskId = asyncHandler(async (req, res) => {
    const { labourId, newTaskId } = req.body;

    // Check if both labourId and newTaskId are provided
    if (!labourId || !newTaskId) {
        throw new ApiError(400, "Labour ID and new Task ID are required");
    }

    // Find the labour by its ID and update the TaskID
    const updatedLabour = await Labour.findByIdAndUpdate(
        labourId,
        { TaskID: newTaskId }, // Update the TaskID with the new one
        { new: true } // Return the updated document
    );

    // Check if the labour was found and updated
    if (!updatedLabour) {
        throw new ApiError(404, "Labour not found");
    }

    // Return the updated labour document
    return res.status(200).json({
        message: "Task ID updated successfully",
        updatedLabour,
    });
});

const getAttendanceSummary = asyncHandler(async (req, res) => {
    const { projectId } = req.params; // Optional: Filter by project

    const match = projectId ? { ProjectID: projectId } : {};

    // Aggregate attendance by date
    const attendanceSummary = await Labour.aggregate([
        { $match: match },
        { $unwind: "$Attendance" },
        { $match: { "Attendance.status": "Present" } }, // Only count "Present" status
        {
            $group: {
                _id: { date: "$Attendance.date" },
                totalPresent: { $sum: 1 },
            },
        },
        { $sort: { "_id.date": 1 } },
    ]);

    const formattedData = attendanceSummary.map((entry) => ({
        date: entry._id.date.toISOString().split("T")[0],
        totalPresent: entry.totalPresent,
    }));

    res.status(200).json(new ApiResponse(200, formattedData, "Attendance summary retrieved successfully"));
});


export {
    registerLabour,
    updateAttendance,
    getLabourDetails,
    getLaboursByProjectId,
    updateTaskId,
    getAttendanceSummary
};