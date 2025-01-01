import express from "express";
import {
  addMaterial,
  getMaterialById,
  getMaterialsByProjectId,
  createPurchaseOrder,
} from "../controllers/material.controller.js";

const router = express.Router();

// Material Routes
router.post("/", addMaterial); // Add Material
router.get("/:materialId", getMaterialById); // Get Material by ID
router.get("/:projectId", getMaterialsByProjectId); // Get Materials by Project ID

// Purchase Order Route
router.post("/purchase-orders", createPurchaseOrder); // Create Purchase Order

export default router;
