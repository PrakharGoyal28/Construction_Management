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