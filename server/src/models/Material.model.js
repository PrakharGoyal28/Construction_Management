import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    VendorID: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    ProjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    Quantity: { type: Number, min: 0 },
    Description: { type: String },
    unit: { type: String, enum: ["kg", "lbs", "pcs"], required: true },
    unitPrice: { type: Number, min: 0 },
  },
  { timestamps: true }
);

export const Material = mongoose.model("Material", materialSchema);
