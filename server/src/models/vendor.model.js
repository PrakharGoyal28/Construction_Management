import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Address: { type: String,},
});

export const Vendor = mongoose.model("Vendor", userSchema)