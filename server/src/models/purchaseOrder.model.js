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
    MaterialIds: [
        { type: String, ref: 'Material', required: true }
    ],
},{timestamps:true});

export const PurchaseOrder = mongoose.model("Inventory", purchaseOrderSchema)
