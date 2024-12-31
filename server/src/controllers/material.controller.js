import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";
import { Material } from "../models/Material.model.js";

const addMaterial = asyncHandler(async (req, res) => {
  const { Name, UserId, VendorID, ProjectId, Quantity, Description } = req.body;

  if (!Name || !UserId || !VendorID || !ProjectId) {
    throw new ApiError(400, "All required fields (Name, UserId, VendorID, ProjectId) must be provided.");
  }

  // Create a new material
  const material = await Material.create({
    Name,
    UserId,
    VendorID,
    ProjectId,
    Quantity,
    Description,
  });

  res.status(201).json(new ApiResponce(201, material, "Material added successfully."));
});

const getMaterialById = asyncHandler(async (req, res) => {
  const { materialId } = req.params;

  // Validate that material ID is provided
  if (!materialId) {
    throw new ApiError(400, "Material ID is required.");
  }

  // Find the material by ID
  const material = await Material.findById(materialId)
    .populate("UserId", "name email") // Optionally populate user details
    .populate("VendorID", "VendorName Contact") // Optionally populate vendor details
    .populate("ProjectId", "ProjectName Description") // Optionally populate project details
    .exec();

  // Check if material exists
  if (!material) {
    throw new ApiError(404, "Material not found.");
  }

  // Return the material details
  res.status(200).json(new ApiResponce(200, material, "Material retrieved successfully."));
});

const getMaterialsByProjectId = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(400, "Project ID is required.");
  }

  // Fetch materials with the given Project ID
  const materials = await Material.find({ ProjectId: projectId })
    .populate("VendorID", "Name") // Optional: Populate Vendor details if needed
    .select("Name Quantity Description VendorID ProjectId"); // Select specific fields to return

  if (materials.length === 0) {
    throw new ApiError(404, "No materials found for the specified Project ID.");
  }

  res.status(200).json(new ApiResponce(200, materials, "Materials retrieved successfully."));
});
const createPurchaseOrder = asyncHandler(async (req, res) => {
  const { Name, VendorID, Quantity, Description, Price, StorageLocation, Status, MaterialIds,UserId } = req.body;

  // Validation: Required fields
  if (!Name || !UserId || !VendorID || !Quantity || !MaterialIds || MaterialIds.length === 0) {
    throw new ApiError(400, "Name, VendorID, Quantity, and MaterialIds are required.");
  }

  // Check if all Material IDs exist in the database
  const materials = await Material.find({ _id: { $in: MaterialIds } });
  if (materials.length !== MaterialIds.length) {
    throw new ApiError(400, "One or more Material IDs are invalid.");
  }

  // Create a new purchase order
  const newPurchaseOrder = new PurchaseOrder({
    Name,
    VendorID,
    Quantity,
    Date: Date || new Date(),
    Description,
    Price,
    StorageLocation,
    Status,
    MaterialIds,
    UserId
  });

  // Save to the database
  const savedPurchaseOrder = await newPurchaseOrder.save();

  res.status(201).json(new ApiResponce(201, savedPurchaseOrder, "Purchase order created successfully."));
});



export {
  addMaterial,
  getMaterialsByProjectId,
  createPurchaseOrder,
}