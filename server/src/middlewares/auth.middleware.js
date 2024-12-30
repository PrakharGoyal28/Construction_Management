import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token= req.cookies?.accessToken || req.header("Authoriztion")?.replace("Bearer ","")
    
        if(!token){
            throw new ApiError(401,"Unautorized access")
        }
    
        const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRECT)
    
        const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(401,"invalid access token")
        }
        req.user=user;
        next();
    } catch (error) {
        throw new ApiError(401,"some error in verifyjwt")
    }

})
export const checkRole = (req, res, next) => {
    try {
      const { role } = req.user; // Assume `req.user` is populated (e.g., from authentication middleware)
  
      if (!role) {
        return res.status(403).json({ message: "Role is required to perform this action" });
      }
  
      if (role !== "admin" && role !== "supervisor") {
        return res.status(403).json({ message: "Access denied. Only admins or supervisors can perform this action" });
      }
  
      next(); // Proceed to the next middleware or controller
    } catch (error) {
      console.error("Error checking role:", error); // Log any unexpected errors
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

  