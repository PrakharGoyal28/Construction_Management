import mongoose from 'mongoose'

const materialSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    VendorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    ProjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    Quantity: {type: Number},
    Description: {type: String},
    unit:{type: String},
    unitPrice:{type: Number},
  },{timestamps: true});

   export const Material = mongoose.model('Material', materialSchema);
  

