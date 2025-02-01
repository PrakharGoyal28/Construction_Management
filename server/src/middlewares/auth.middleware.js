import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT=asyncHandler(async(req,res,next)=>{
  try {
    // Get the user ID from the request header or body (depending on how you're passing it)
    const { userId } = req.body || req.headers;

    if (!userId) {
      throw new ApiError(401, "Unauthorized access: user ID is missing");
    }

    // Fetch the user from the database
    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Check if the user is logged in
    if (!user.isLoggedIn) {
      throw new ApiError(403, "User is not logged in");
    }

    req.user = user; // Attach the user to the request object for use in subsequent handlers
    next(); // Proceed to the next middleware or route
  } catch (error) {
    throw new ApiError(401, `Unauthorized access ${error}`);
  }
});
export const checkRole = (req, res, next) => {
    try {
      const { role } = req.user; // Assume `req.user` is populated (e.g., from authentication middleware)
  
      if (!role) {
        return res.status(403).json({ message: "Role is required to perform this action" });
      }
  
      if (role !== "Admin" && role !== "Supervisor") {
        return res.status(403).json({ message: "Access denied. Only admins or supervisors can perform this action" });
      }
  
      next(); // Proceed to the next middleware or controller
    } catch (error) {
      console.error("Error checking role:", error); // Log any unexpected errors
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

export const restrictChatAccess = asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;
    const userId = req.user.id; // Assuming `req.user` contains the authenticated user's info

    const project = await project.findById(projectId);

    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }

    const isUserInTeam = project.team.includes(userId);

    if (!isUserInTeam) {
        res.status(403);
        throw new Error("Access denied. You are not part of the project team.");
    }

    next();
});
