import mongoose from 'mongoose'

const materialSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    UserId: { type: String, ref: 'User', required: true },
    VendorID: { type: String, ref: 'Vendor', required: true },
    ProjectId: { type: String, ref: 'Project', required: true },
    Quantity: {type: Number},
    Description: {type: String},
  });

   export const Material = mongoose.model('Material', materialSchema);
  

