import mongoose from 'mongoose'

const materialSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    UserId: { type: String, ref: 'User', required: true },
    VendorID: { type: String, ref: 'Vendor', required: true },
    ProjectId: { type: String, ref: 'Project', required: true },
    Quantity: {type: Number},
    Description: {type: String},
    unit:{type: String},
    unitPrice:{type: Number},
  },{timestamps: true});

   export const Material = mongoose.model('Material', materialSchema);
  

