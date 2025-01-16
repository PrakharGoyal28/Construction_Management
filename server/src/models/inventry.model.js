import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  MaterialIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true
    }
  ],
  FutureMaterialIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true
    }
  ],
  ProjectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  }
});

export const Inventory = mongoose.model("Inventory", inventorySchema);
