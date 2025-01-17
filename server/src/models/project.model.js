import mongoose, { Schema } from "mongoose";

// Projects Schema
const ProjectSchema = new mongoose.Schema({
    ProjectName: { type: String, required: true },
    UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    StartDate: { type: Date },
    EndDate: { type: Date },
    TotalBudget:{type: Number},
    Status: { type: String },
    Description: { type: String },
  });

  
export const Project=mongoose.model("Project",ProjectSchema)

