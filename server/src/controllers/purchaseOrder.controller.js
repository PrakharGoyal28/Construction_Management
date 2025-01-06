import {asyncHandler} from "express-async-handler";
import { PurchaseOrder } from "../models/purchaseOrder.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

// Create a purchase order
const createPurchaseOrder = asyncHandler(async (req, res) => {
  const { Name, VendorID, UserId, Quantity, Date, Description, Price, StorageLocation, Status, MaterialIds } = req.body;

  // Validate required fields
  if (!Name || !VendorID || !UserId || !Quantity || !MaterialIds || MaterialIds.length === 0) {
    throw new ApiError(400, "Name, VendorID, UserId, Quantity, and MaterialIds are required.");
  }

  // Create a new purchase order
  const purchaseOrder = await PurchaseOrder.create({
    Name,
    VendorID,
    UserId,
    Quantity,
    Date: Date || new Date(),
    Description,
    Price,
    StorageLocation,
    Status,
    MaterialIds,
  });

  res.status(201).json(new ApiResponse(201, purchaseOrder, "Purchase order created successfully."));
});

// Update a purchase order
const updatePurchaseOrder = asyncHandler(async (req, res) => {
  const { purchaseOrderId } = req.params;

  if (!purchaseOrderId) {
    throw new ApiError(400, "Purchase Order ID is required.");
  }

  const updatedPurchaseOrder = await PurchaseOrder.findByIdAndUpdate(
    purchaseOrderId,
    req.body,
    { new: true, runValidators: true } // Return updated document and validate inputs
  );

  if (!updatedPurchaseOrder) {
    throw new ApiError(404, "Purchase order not found.");
  }

  res.status(200).json(new ApiResponse(200, updatedPurchaseOrder, "Purchase order updated successfully."));
});

// Delete a purchase order
const deletePurchaseOrder = asyncHandler(async (req, res) => {
  const { purchaseOrderId } = req.params;

  if (!purchaseOrderId) {
    throw new ApiError(400, "Purchase Order ID is required.");
  }

  const deletedPurchaseOrder = await PurchaseOrder.findByIdAndDelete(purchaseOrderId);

  if (!deletedPurchaseOrder) {
    throw new ApiError(404, "Purchase order not found.");
  }

  res.status(200).json(new ApiResponse(200, null, "Purchase order deleted successfully."));
});

// Get all purchase orders
const getAllPurchaseOrders = asyncHandler(async (req, res) => {
  const purchaseOrders = await PurchaseOrder.find()
    .populate("VendorID", "Name Contact") // Populate vendor details
    .populate("UserId", "Name Email") // Populate user details
    .populate("MaterialIds", "Name Quantity Description") // Populate material details
    .exec();

  if (!purchaseOrders || purchaseOrders.length === 0) {
    throw new ApiError(404, "No purchase orders found.");
  }

  res.status(200).json(new ApiResponse(200, purchaseOrders, "Purchase orders retrieved successfully."));
});

// Get purchase orders by Vendor ID
const getPurchaseOrdersByVendorId = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;

  if (!vendorId) {
    throw new ApiError(400, "Vendor ID is required.");
  }

  const purchaseOrders = await PurchaseOrder.find({ VendorID: vendorId })
    .populate("MaterialIds", "Name Quantity Description") // Populate material details
    .exec();

  if (!purchaseOrders || purchaseOrders.length === 0) {
    throw new ApiError(404, "No purchase orders found for the given Vendor ID.");
  }

  res.status(200).json(new ApiResponse(200, purchaseOrders, `Purchase orders for Vendor ID: ${vendorId}`));
});

export {
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrdersByVendorId,
};
