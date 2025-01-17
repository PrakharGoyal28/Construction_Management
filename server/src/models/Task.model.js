import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    TaskName: { type: String, required: true },
<<<<<<< HEAD
    AssignedTo: [{ type: String, ref: 'User' }],
    Starttime:{type:Date},
    Deadline: { type:Date },
=======
    AssignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    Deadline: { type: Date },
>>>>>>> 9cf8a0710276a5c2210d760b31c7577926af9905
    Status: { type: String },
    Description: { type: String },
    ProjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    LabourRequired: { type: Number },
    ImageUrl: { type: String },
    Prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  },{timestamps:true});

 export const Task = mongoose.model('Task', taskSchema);

