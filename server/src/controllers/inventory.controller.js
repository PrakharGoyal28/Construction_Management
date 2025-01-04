import { Inventory } from "../models/inventry.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponce} from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Controller to create an inventory record
export const createInventory = asyncHandler(async (req, res) => {
  const { MaterialIds, FutureMaterialIds, ProjectID } = req.body;

  if (!MaterialIds || !FutureMaterialIds || !ProjectID) {
    throw new ApiError(400, "MaterialIds, FutureMaterialIds, and ProjectID are required.");
  }

  const inventory = new Inventory({
    MaterialIds,
    FutureMaterialIds,
    ProjectID,
  });

  await inventory.save();

  res.status(201).json(new ApiResponce(201, inventory, "Inventory created successfully."));
});

// Controller to update inventory
export const updateInventory = asyncHandler(async (req, res) => {
  const { inventoryId } = req.params;
  const { MaterialIds, FutureMaterialIds, ProjectID } = req.body;

  if (!inventoryId) {
    throw new ApiError(400, "Inventory ID is required.");
  }

  const inventory = await Inventory.findById(inventoryId);

  if (!inventory) {
    throw new ApiError(404, "Inventory not found.");
  }

  if (MaterialIds) inventory.MaterialIds = MaterialIds;
  if (FutureMaterialIds) inventory.FutureMaterialIds = FutureMaterialIds;
  if (ProjectID) inventory.ProjectID = ProjectID;

  await inventory.save();

  res.status(200).json(new ApiResponce(200, inventory, "Inventory updated successfully."));
});

// Controller to delete inventory
export const deleteInventory = asyncHandler(async (req, res) => {
  const { inventoryId } = req.params;

  if (!inventoryId) {
    throw new ApiError(400, "Inventory ID is required.");
  }

  const inventory = await Inventory.findByIdAndDelete(inventoryId);

  if (!inventory) {
    throw new ApiError(404, "Inventory not found.");
  }

  res.status(200).json(new ApiResponce(200, inventory, "Inventory deleted successfully."));
});

// Controller to get inventory by ID
export const getInventoryById = asyncHandler(async (req, res) => {
  const { inventoryId } = req.params;

  if (!inventoryId) {
    throw new ApiError(400, "Inventory ID is required.");
  }

  const inventory = await Inventory.findById(inventoryId)
    .populate("MaterialIds", "Name Quantity")
    .populate("FutureMaterialIds", "Name Quantity")
    .populate("ProjectID", "ProjectName");

  if (!inventory) {
    throw new ApiError(404, "Inventory not found.");
  }

  res.status(200).json(new ApiResponce(200, inventory, "Inventory retrieved successfully."));
});

// Controller to get inventory by project ID
export const getInventoryByProjectId = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(400, "Project ID is required.");
  }

  const inventories = await Inventory.find({ ProjectID: projectId })
    .populate("MaterialIds", "Name Quantity")
    .populate("FutureMaterialIds", "Name Quantity");

  if (!inventories || inventories.length === 0) {
    throw new ApiError(404, "No inventories found for the given project ID.");
  }

  res.status(200).json(new ApiResponce(200, inventories, "Inventories retrieved successfully."));
});
