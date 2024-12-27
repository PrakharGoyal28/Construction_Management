import mongoose, { Schema } from "mongoose";

const labourSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Contact: { type: String },
    Type: { type: String },
    ProjectID: { type: String, ref: 'Project', required: true },
    Rate: { type: Number },
    TaskID: { type: String, ref: 'Task' },
    Attendance: { type: Object },
  });
  
export const Labour = mongoose.model("Labour", labourSchema)
  