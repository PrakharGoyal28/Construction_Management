import express from "express";
import {
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrdersByVendorId,
} from "../controllers/purchaseOrder.controller.js";

const router = express.Router();

// Route to create a purchase order
router.post("/create", createPurchaseOrder);

// Route to update a purchase order
router.put("/update/:purchaseOrderId", updatePurchaseOrder);

// Route to delete a purchase order
router.delete("/delete/:purchaseOrderId", deletePurchaseOrder);

// Route to get all purchase orders
router.get("/all", getAllPurchaseOrders);

// Route to get purchase orders by Vendor ID
router.get("/vendor/:vendorId", getPurchaseOrdersByVendorId);

export default router;
