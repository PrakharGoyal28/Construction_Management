import mongoose, { Schema } from "mongoose";

const purchaseOrderSchema = new mongoose.Schema({
    materialID: [{ type: String, ref: 'Inventory', required: true }],
    VendorID: { type: String, ref: 'Vendor', required: true },
    Quantity: { type: Number, required: true },
    Date: { type: Date },
    Status: { type: String },
});

export const PurchaseOrder = mongoose.model("Inventory", purchaseOrderSchema)
