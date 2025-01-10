import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  UserID: { type: String, ref: 'User', required: true },
  Address: { type: String,},
});

export const Vendor = mongoose.model("Vendor", userSchema)