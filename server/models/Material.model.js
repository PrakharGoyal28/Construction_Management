import mongoose from 'mongoose'

const materialSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    VendorID: { type: String, ref: 'Vendor', required: true },
    PastOrders: { type: String },
    Bills: { type: String },
    Quantity: {type: Number},
  });

   const Material = mongoose.model('Material', materialSchema);
  
    export default Material;
