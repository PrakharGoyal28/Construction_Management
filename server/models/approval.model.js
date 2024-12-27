import mongoose, { Schema } from "mongoose";

const approvalSchema = new mongoose.Schema({
    TaskID: { type: String, ref: 'Task' },
    Status: { type: String },
  },{timestamps:true});
  

//for qc check
export const Approval = mongoose.model("Approval", approvalSchema)