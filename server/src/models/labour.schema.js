import mongoose, { Schema } from "mongoose";

const labourSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Contact: { type: String },
    Type: { type: String },
    ProjectID: { type: String, ref: 'Project', required: true },
    Rate: { type: Number },
    TaskID: { type: String, ref: 'Task' },
    Attendance: [
      {
        date: { type: Date}, // The date of attendance
        status: { 
          type: String, 
          enum: ["Present", "Absent"], 
          required: true 
        },
        remarks: { type: String } // Optional remarks
      }
    ]
  });
  
export const Labour = mongoose.model("Labour", labourSchema)
  