import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Material } from "../models/Material.model.js";
import { PurchaseOrder } from "../models/purchaseOrder.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

const addMaterial = asyncHandler(async (req, res) => {
  try {
    const { Name, UserId, VendorID, ProjectId, Quantity, Description, unit, unitPrice, location, lastRecieved, type, Recieve } = req.body;
    const imagePath = req.file.path;

    const upload = await uploadCloudinary(imagePath);
    const upload_url = upload.url;
    if (!upload) {
      throw new ApiError(500, "Failed to upload photo to Cloudinary");
  }

    // Check if required fields are present
    if (!Name || !UserId || !VendorID || !unit || !type) {
      throw new ApiError(400, "Required fields: Name, UserId, VendorID, unit, type");
    }

    // Create a new material object
    const newMaterial = new Material({
      Name,
      UserId,
      VendorID,
      ProjectId,
      Quantity: Quantity || 0, // Default to 0 if not provided
      Description,
      unit,
      unitPrice: unitPrice || 0, // Default to 0 if not provided
      location,
      lastRecieved,
      type,
      Recieve,
      proofImage:upload_url,
    });

    // Save the new material to the database
    const savedMaterial = await newMaterial.save();

    return res.status(201).json(new ApiResponse(201, savedMaterial, "Material added successfully"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Failed to add material"));
  }
});
const getMaterialById = asyncHandler(async (req, res) => {
  const { materialId } = req.params;

  // Validate that material ID is provided
  if (!materialId) {
    throw new ApiError(400, "Material ID is required.");
  }

  // Find the material by ID and populate the necessary fields
  const material = await Material.findById(materialId)
    .populate("UserId", "name email") // Populate user details
    .populate({
      path: "VendorID", 
      select: "VendorName Contact",
      populate: {
        path: "UserID", // Populate the user details from the Vendor
        select: "name email" // Select the user fields you need
      }
    })
    .exec();

  // Check if material exists
  if (!material) {
    throw new ApiError(404, "Material not found.");
  }

  // Return the material details
  res.status(200).json(new ApiResponse(200, material, "Material retrieved successfully."));
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

  res.status(200).json(new ApiResponse(200, materials, "Materials retrieved successfully."));
});


const createPurchaseOrder = asyncHandler(async (req, res) => {
  const { Name, VendorID, Quantity, Description, Price, StorageLocation, Status, MaterialIds, UserId } = req.body;

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
    Date: new Date(), // Set the current date for Date
    Description,
    Price,
    location: StorageLocation, // Fixed `StorageLocation` to lowercase `location` in schema
    Status,
    MaterialIds,
    UserId
  });

  // Save to the database
  const savedPurchaseOrder = await newPurchaseOrder.save();

  // Return a successful response
  res.status(201).json(new ApiResponse(201, savedPurchaseOrder, "Purchase order created successfully."));
});

const getMaterialsByType = async (req, res) => {
  try {
    const { type } = req.query;

    // Validate the type query parameter
    if (!type || !["Current", "Recieve", "ordered"].includes(type)) {
      throw new ApiError(400, "Invalid or missing type parameter. Valid values are 'Current', 'Recieve', or 'ordered'");
    }

    let materials;

    if (type === 'ordered') {
      // Fetch materials where Recieve is either 'ForApproval' or 'Approved'
      materials = await Material.find({
        Recieve: { $in: ['ForApproval', 'Approved'] },
      });
    } else if (type === 'Current') {
      // Fetch materials where type is 'Current'
      materials = await Material.find({ type: 'Current' });
    } else if (type === 'Recieve') {
      // Fetch materials where type is 'Recieve'
      materials = await Material.find({ type: 'Recieve' });
    }

    // If no materials are found
    if (!materials || materials.length === 0) {
      return res.status(404).json(new ApiResponse(404, [], "No materials found for the specified type"));
    }

    return res.status(200).json(new ApiResponse(200, materials, "Materials retrieved successfully"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Failed to retrieve materials"));
  }
};

export {
  addMaterial,
  getMaterialsByProjectId,
  getMaterialById,
  createPurchaseOrder,
  getMaterialsByType
}