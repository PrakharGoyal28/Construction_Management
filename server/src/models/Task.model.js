import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    TaskName: { type: String, required: true },
    Location: {type:String},
    LabourRequired: [{ 
      Number:{type:Number},
      Role:{type:String , enum:['General','Plumber','Electrician']}
     }],
    AssignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',default:null }],
    Starttime:{type:Date},
    Deadline: { type: Date },
    // EquipmentRequired : [], TODO: material
    Status: { type: String },
    Description: { type: String },
    ProjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Project',default:null},
    ImageUrl: { type: String },
    Prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  },{timestamps:true});

 export const Task = mongoose.model('Task', taskSchema);

