import express from "express";
import {
  addVendor,
  deleteVendor,
  updateVendor,
  getPurchaseOrdersByVendorId,
} from "../controllers/vendor.controller.js";

const router = express.Router();

// Route to add a vendor
router.post("/add", addVendor);

// Route to delete a vendor by ID
router.delete("/delete/:vendorId", deleteVendor);

// Route to update a vendor by ID
router.put("/update/:vendorId", updateVendor);

// Route to get purchase orders by Vendor ID
router.get("/purchaseOrders/:vendorId", getPurchaseOrdersByVendorId);

export default router;
