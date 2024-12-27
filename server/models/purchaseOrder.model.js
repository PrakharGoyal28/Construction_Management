import mongoose, { Schema } from "mongoose";

const purchaseOrderSchema = new mongoose.Schema({
    Name: {type: String},
    VendorID: { type: String, ref: 'Vendor', required: true },
    Quantity: { type: Number, required: true },
    Date: { type: Date },
    Description:{type: String},
    Price:{type : Number},
    StorageLocation:{type: String},

    Status: { type: String },
});

export const PurchaseOrder = mongoose.model("Inventory", purchaseOrderSchema)
