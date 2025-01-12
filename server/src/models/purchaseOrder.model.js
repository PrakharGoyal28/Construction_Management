import mongoose, { Schema } from "mongoose";

const purchaseOrderSchema = new mongoose.Schema({
    Name: {type: String},
    VendorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Quantity: { type: Number, required: true },
    Date: { type: Date },
    Description:{type: String},
    Price:{type : Number},
    StorageLocation:{type: String},
    Status: { type: String },
    MaterialIds: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true }
    ],
},{timestamps:true});

export const PurchaseOrder = mongoose.model("purchaseOrder", purchaseOrderSchema)
