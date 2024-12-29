import mongoose from 'mongoose'

const materialSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    VendorID: { type: String, ref: 'Vendor', required: true },
    Bills: { type: String },
    Quantity: {type: Number},
  });

   export const Material = mongoose.model('Material', materialSchema);
  

