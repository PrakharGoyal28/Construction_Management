import express from "express";
import {
  addMaterial,
  getMaterialById,
  getMaterialsByProjectId,
  createPurchaseOrder,
  getMaterialsByType,
  putMaterialForApproval,
} from "../controllers/material.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Material Routes
router.post("/addMaterial", upload.single("image"),addMaterial); // Add Material
router.get("/getMaterial/:materialId", getMaterialById); // Get Material by ID
router.get("/getMaterialByProjectId/:projectId", getMaterialsByProjectId); // Get Materials by Project ID
router.get("/getMaterialByType",getMaterialsByType)
router.put('/putMaterialForApproval/:materialId', upload.single('proofImage'), putMaterialForApproval);
// Purchase Order Route
router.post("/genrate-purchase-order", createPurchaseOrder); // Create Purchase Order

export default router;
