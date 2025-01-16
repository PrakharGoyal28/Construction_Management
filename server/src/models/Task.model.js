import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    TaskName: { type: String, required: true },
    AssignedTo: [{ type: String, ref: 'User' }],
    Starttime:{type:Date},
    Deadline: { type:Date },
    Status: { type: String },
    Description: { type: String },
    ProjectID: { type: String, ref: 'Project', required: true },
    LabourRequired: { type: Number },
    ImageUrl: { type: String },
    Prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  },{timestamps:true});

 export const Task = mongoose.model('Task', taskSchema);

