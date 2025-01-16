import mongoose, { Schema } from "mongoose";

const approvalSchema = new mongoose.Schema({
    TaskID: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    Status: { type: String },
  },{timestamps:true});
  

export const Approval = mongoose.model("Approval", approvalSchema)