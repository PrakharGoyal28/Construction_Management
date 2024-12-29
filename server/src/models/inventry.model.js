import mongoose, { Schema } from "mongoose";

const inventorySchema = new mongoose.Schema({
    MaterialIds: [
        { type: String, ref: 'Material', required: true }
    ],
    FutureMaterialIds: [
        { type: String, ref: 'Material', required: true }
    ],
    ProjectID: { type: String, ref: 'Project', required: true },
    
});


export const Inventory = mongoose.model("Inventory", inventorySchema)
