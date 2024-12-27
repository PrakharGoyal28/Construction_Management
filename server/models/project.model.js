import mongoose,{Schema} from "mongoose";

// Projects Schema
const projectSchema = new mongoose.Schema({
    ProjectName: { type: String, required: true },
    UserID: { type: String, ref: 'User', required: true },
    StartDate: { type: Date },
    EndDate: { type: Date },
    Status: { type: String },
    Description: { type: String },
  });

  
export const Project=mongoose.model("Project",projectSchema)