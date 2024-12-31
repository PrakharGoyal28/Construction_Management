import { Vendor } from "../models/vendor.model";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";

// Controller to add a new vendor
const addVendor = asyncHandler(async (req, res) => {
    const { UserID, Address, BankName, AccountNo, GSTNo, IFSC } = req.body;

    if (!UserID) {
        throw new ApiError(400, "UserID is required.");
    }

    // Check if the vendor already exists
    const existingVendor = await Vendor.findOne({ UserID });
    if (existingVendor) {
        throw new ApiError(400, "Vendor with this UserID already exists.");
    }

    // Create a new vendor
    const vendor = await Vendor.create({
        UserID,
        Address,
        BankName,
        AccountNo,
        GSTNo,
        IFSC,
    });

    res.status(201).json(new ApiResponce(201, vendor, "Vendor added successfully."));
});

// Controller to delete a vendor
const deleteVendor = asyncHandler(async (req, res) => {
    const { vendorId } = req.params;

    if (!vendorId) {
        throw new ApiError(400, "Vendor ID is required.");
    }

    // Delete the vendor
    const vendor = await Vendor.findByIdAndDelete(vendorId);

    if (!vendor) {
        throw new ApiError(404, "Vendor not found.");
    }

    res.status(200).json(new ApiResponce(200, null, "Vendor deleted successfully."));
});

// Controller to update vendor details
const updateVendor = asyncHandler(async (req, res) => {
    const { vendorId } = req.params;

    if (!vendorId) {
        throw new ApiError(400, "Vendor ID is required.");
    }

    // Update vendor details
    const updatedVendor = await Vendor.findByIdAndUpdate(
        vendorId,
        req.body,
        { new: true, runValidators: true } // Return the updated document and validate
    );

    if (!updatedVendor) {
        throw new ApiError(404, "Vendor not found.");
    }

    res.status(200).json(new ApiResponce(200, updatedVendor, "Vendor updated successfully."));
});

export {
    addVendor,
    deleteVendor,
    updateVendor,
}