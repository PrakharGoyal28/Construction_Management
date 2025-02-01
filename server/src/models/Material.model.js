import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    VendorID: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    ProjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project"},
    Quantity: { type: Number, min: 0 },
    Description: { type: String },
    unit: { type: String, enum: ["kg", "lbs", "pcs"], required: true },
    unitPrice: { type: Number, min: 0 },
    location :{type:String},
    lastRecieved: { type: Date },
    lastUpdated: { type: Date },
    proofImage: { type: String },
    type: { type: String, enum: ["Current", "Recieve"]},
    Recieve:{type :String , enum:['Current','InTransit','Recievable','ForApproval','Approved','Rejected']},
  },
  { timestamps: true }
);

export const Material = mongoose.model("Material", materialSchema);
