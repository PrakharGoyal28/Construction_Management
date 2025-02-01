import express from "express";
import {
  addMaterial,
  getMaterialById,
  getMaterialsByProjectId,
  createPurchaseOrder,
  getMaterialsByType,
} from "../controllers/material.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Material Routes
router.post("/addMaterial", upload.single("image"),addMaterial); // Add Material
router.get("/getMaterial/:materialId", getMaterialById); // Get Material by ID
router.get("/getMaterialByProjectId/:projectId", getMaterialsByProjectId); // Get Materials by Project ID
router.get("/getMaterialByType",getMaterialsByType)
// Purchase Order Route
router.post("/genrate-purchase-order", createPurchaseOrder); // Create Purchase Order

export default router;
