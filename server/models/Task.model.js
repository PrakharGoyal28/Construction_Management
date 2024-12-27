import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    TaskName: { type: String, required: true },
    AssignedTo: { type: String, ref: 'Labour' },
    Deadline: { type: Date },
    Status: { type: String },
    Description: { type: String },
    ProjectID: { type: String, ref: 'Project', required: true },
    LabourRequired: { type: Number },
  });

  const Task = mongoose.model('Task', TaskSchema);

  export default Task;