import mongoose from 'mongoose'

const MaterialSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    VendorID: { type: String, ref: 'Vendor', required: true },
    PastOrders: { type: String },
    Bills: { type: String },
    Quantity: {type: Number},
  });

   const Material = mongoose.model('Material', MaterialSchema);
  
    export default Material;
