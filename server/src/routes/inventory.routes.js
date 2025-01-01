import express from "express";
import {
  createInventory,
  updateInventory,
  deleteInventory,
  getInventoryById,
  getInventoryByProjectId,
} from "../controllers/inventory.controller.js";

const router = express.Router();

router.post("/", createInventory); // Create inventory
router.put("/:inventoryId", updateInventory); // Update inventory
router.delete("/:inventoryId", deleteInventory); // Delete inventory
router.get("/:inventoryId", getInventoryById); // Get inventory by ID
router.get("/project/:projectId", getInventoryByProjectId); // Get inventory by project ID

export default router;
