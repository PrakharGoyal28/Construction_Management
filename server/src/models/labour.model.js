import mongoose, { Schema } from "mongoose";

const labourSchema = new mongoose.Schema({
    name: { type: String, required: true },
    Contact: { type: String },
    Type: { type: String },
    ProjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Project',default: null},//TODO:make this required
    Rate: { type: Number },
    TaskID: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
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
    ],
    ImageUrl:{type:String},
    Embeddings: { type: [Number] }, // Array for storing face embeddings
  },{timestamps:true});
  
export const Labour = mongoose.model("Labour", labourSchema)