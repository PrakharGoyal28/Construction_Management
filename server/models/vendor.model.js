import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  UserID: { type: String, ref: 'User', required: true },
  Address: { type: String,},
  GSTNo: { type: String },

  BankName: { type: String },
  AccountNo: { type: String },
  IFSC: { type: String },

});

export const Vendor = mongoose.model("Vendor", userSchema)