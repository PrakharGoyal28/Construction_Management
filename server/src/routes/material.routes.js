import express from "express";
import {
  addMaterial,
  getMaterialById,
  getMaterialsByProjectId,
  createPurchaseOrder,
} from "../controllers/material.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Material Routes
router.post("/addMaterial", upload.single("image"),addMaterial); // Add Material
router.get("/getMaterial/:materialId", getMaterialById); // Get Material by ID
router.get("/:projectId", getMaterialsByProjectId); // Get Materials by Project ID

// Purchase Order Route
router.post("/genrate-purchase-order", createPurchaseOrder); // Create Purchase Order

export default router;
