import { Labour } from "../models/labour.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { uploadCloudinary } from "../utils/cloudinary.js";
import axios from "axios";



function calculateCosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val ** 2, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val ** 2, 0));
    return dotProduct / (magnitude1 * magnitude2);
  }


const registerLabour = asyncHandler(async function (req, res) {
    const { name, Contact, Type, ProjectID, Rate, TaskID } = req.body;
    const imagePath = req.file.path;

    const upload = await uploadCloudinary(imagePath);
    const upload_url = upload.url;
    // console.log(upload_url);
    

    if (!upload) {
        throw new ApiError(500, "Failed to upload photo to Cloudinary");
    }

    if (!name || !Contact || !Type || !ProjectID || !Rate || !TaskID) {
        throw new ApiError(400, "All fields are required");
    }

    try {
        const response = await axios.post(`${BASE_URLL}/extract`, {
            image: upload_url, // Send the Cloudinary URL to the Python backend
        });

        if (!response.data || !response.data.embedding) {
            throw new ApiError(400, "Failed to generate face embeddings");
        }

        const embedding = response.data.embedding; // Extract the face embedding array

        // Step 4: Create a new Labour document
        const newLabour = new Labour({
            name,
            Contact,
            Type,
            ProjectID,
            Rate,
            TaskID,
            Attendance: [], // Initialize with an empty attendance array
            ImageUrl: upload_url, // Store the uploaded image URL
            Embeddings: embedding, // Store the face embeddings
        });

        // Step 5: Save the labourer to the database
        const savedLabour = await newLabour.save();

        if (savedLabour) {
            return res.status(201).json(
                new ApiResponse(201, savedLabour, "Labour registered successfully")
            );
        } else {
            throw new ApiError(500, "Something went wrong while creating the labour");
        }
    } catch (error) {
        throw new ApiError(500, `Error generating embeddings: ${error.message}`);
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
            (entry) => entry.date.toISOString().split("T")[0] ===
                attendanceDate.toISOString().split("T")[0]
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

        return res
            .status(200)
            .json(
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
        const recordedDates = labour.Attendance.map(
            (entry) => entry.date.toISOString().split("T")[0]
        );

        // Build an array of all dates in the range
        const start = new Date(startDate);
        const end = new Date(endDate);

        const dateRange = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            dateRange.push(new Date(d).toISOString().split("T")[0]);
        }

        // Check for missing dates and add absent entries
        const missingDates = dateRange.filter(
            (date) => !recordedDates.includes(date)
        );

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
            new ApiResponse(
                200,
                {
                    labour: {
                        name: labour.name,
                        Contact: labour.Contact,
                        Type: labour.Type,
                        ProjectID: labour.ProjectID,
                        Rate: labour.Rate,
                        TaskID: labour.TaskID,
                        Attendance: labour.Attendance, // All attendance details
                    },
                },
                `Attendance history for ${labour.name}`
            )
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

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    labours,
                    `Labours for project ${projectId} retrieved successfully`
                )
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

    const getAllLabours = asyncHandler(async (req, res) => {
        // Fetch all labourers
        const labours = await Labour.find({});

        if (!labours || labours.length === 0) {
            throw new ApiError(404, "No labours found");
        }

        // Return the labour data
        return res
            .status(200)
            .json(new ApiResponse(200, labours, "All labours retrieved successfully"));
    });
    const getAttendanceSummary = asyncHandler(async (req, res) => {
        const { projectId } = req.params; // Optional: Filter by project

        const match = projectId ? { ProjectID: projectId } : {};

        // Aggregate attendance by date
        const attendanceSummary = await Labour.aggregate([
            { $match: match }, // Optional project filter
            { $unwind: "$Attendance" }, // Flatten the Attendance array
            {
                $match: {
                    "Attendance.date": { $exists: true, $ne: null }, // Ensure date exists
                },
            },
            {
                $group: {
                    _id: {
                        labourId: "$_id", // Group by labour ID to avoid duplicate attendance
                        date: "$Attendance.date", // Also group by date
                    },
                    status: { $first: "$Attendance.status" }, // Capture the status
                },
            },
            {
                $group: {
                    _id: "$_id.date", // Group by date for final aggregation
                    totalPresent: {
                        $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] },
                    },
                    totalAbsent: {
                        $sum: { $cond: [{ $eq: ["$status", "Absent"] }, 1, 0] },
                    },
                },
            },
            { $sort: { _id: 1 } }, // Sort by date in ascending order
        ]);

        // Format the aggregated data
        const formattedData = attendanceSummary.map((entry) => ({
            date: entry._id.toISOString().split("T")[0],
            totalPresent: entry.totalPresent,
            totalAbsent: entry.totalAbsent,
        }));

        res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    formattedData,
                    "Attendance summary retrieved successfully"
                )
            );
    });

const verifyembedding = async (req, res) => {
        const { labourId, embedding } = req.body;
      
        try {
          const labour = await Labour.findById(labourId);
      
          if (!labour) {
            return res.status(404).json({ matched: false, message: 'Labour not found' });
          }
      
          const storedEmbedding = labour.Embeddings;
      
          const similarity = calculateCosineSimilarity(storedEmbedding, embedding);
      
          if (similarity > 0.7) {
            labour.Attendance.push(new Date());
            await labour.save();
            return res.json({ matched: true, message: 'Face verified successfully!' });
          } else {
            return res.json({ matched: false, message: 'Face verification failed.' });
          }
        } catch (error) {
          res.status(500).json({ matched: false, message: error.message });
        }
      };

    export {
        registerLabour,
        updateAttendance,
        getLabourDetails,
        getLaboursByProjectId,
        updateTaskId,
        getAttendanceSummary,
        verifyembedding,
        getAllLabours,
    };

