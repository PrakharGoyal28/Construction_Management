import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    TaskName: { type: String, required: true },
    AssignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    Starttime:{type:Date},
    Deadline: { type: Date },
    Status: { type: String },
    Description: { type: String },
    ProjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    LabourRequired: { type: Number },
    ImageUrl: { type: String },
    Prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  },{timestamps:true});

 export const Task = mongoose.model('Task', taskSchema);

