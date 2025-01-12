import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    TaskName: { type: String, required: true },
    AssignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    Deadline: { type: Date },
    Status: { type: String },
    Description: { type: String },
    ProjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    LabourRequired: { type: Number },
    ImageUrl: { type: String },
  },{timestamps:true});

 export const Task = mongoose.model('Task', taskSchema);

