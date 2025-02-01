import mongoose, { Schema } from "mongoose";

const purchaseOrderSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    VendorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Quantity: { type: Number, required: true },
    Date: { type: Date, default: Date.now }, // Default to current date if not provided
    Description: { type: String },
    Price: { type: Number },
    location: { type: String },
    Status: { type: String },
    MaterialIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true }
    ]
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);
