import mongoose, { Schema } from "mongoose";

const approvalSchema = new mongoose.Schema({
    MaterialIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: true
      }
    ],
    Status: { type: String },
  },{timestamps:true});
  

export const Approval = mongoose.model("Approval", approvalSchema)