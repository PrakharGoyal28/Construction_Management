import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const registerUser =asyncHandler( async (req,res)=>{


    const {fullname,email,password,role,contactNo}=req.body
    if( 
        [fullname,email,password,role].some((e)=> e?.trim()==="")
    ){
        throw new ApiError(400,"All field are requires")
    }

    const existUser= await User.findOne({
        $or:[{ email }]
    })
    if(existUser){
        throw new ApiError(409,"user already exist")
    }
    const user= await User.create({
        name:fullname,
        email:email,
        password,
        role,
        contact:contactNo,
        isLoggedin:true,
    })

    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"something went wrong while creating the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully")
    )

})

const loginUser=asyncHandler(async (req,res)=>{
    console.log("login endpoint hit");
    
    const {email,password}=req.body

    if(!email) throw new ApiError(400,"email or username is required")

    const user = await User.findOne({
        $or:[{email}]
    })
    if(!user) throw new ApiError(404,"user not found register")

    const isPassValid= await user.isPasswordCorrect(password)
    
    if(!isPassValid) throw new ApiError(401,"invalid user password")
    user.isLoggedIn = true;
    await user.save();
  
    const loggedInUser= await User.findById(user._id).select("-password")
   
    console.log("user logged in ");
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            loggedInUser,
            "user logged in successfuly"
        )
    )
})

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: { isLoggedIn: false }, 
        },
        {
          new: true,
        }
      );
      console.log("logout");
      
        return res.status(200)
        .json(new ApiResponse(200,{},"User logged out"))
})

const changeCurrentPassword=asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword}=req.body
    const user=await User.findById(req.user?._id)

    const isPasscorrect=user.isPasswordCorrect(oldPassword)
    if(!isPasscorrect){
        throw new ApiError(401,"wrong password")
    }

    user.password=newPassword
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"password changes successfully")
    )
})

const getCurrentUser=asyncHandler(async(req,res)=>{
    return res.status(200)
    .json(new ApiResponse(200,req.user,"current user exported"))
})

const updateAccountDetails=asyncHandler(async(req,res)=>{
    const {fullname,email}=req.body

    if(!fullname && !email){
        throw new ApiError(400,"All fields are required")
    }

    const user=await User.findByIdAndUpdate(req.user?._id,
        {
            $set :{name:fullname,
            email
            }
        },
        {
            new:true
        }
    ).select("-password")

    return res.status(200)
    .json(new ApiResponse(200,user,"Account detail updated"))

})

const getNotification = asyncHandler(async (req, res) => {
    const userId = req.user?._id; // Assuming `req.user` is populated by the `verifyJWT` middleware.

    if (!userId) {
        throw new ApiError(401, "Unauthorized: User ID not found");
    }

    // Fetch notifications for the user
    const notifications = await Notification.find({ users: userId })
        .sort({ createdAt: -1 }) // Sort by newest first
        .select("TaskID Message ImageUrl Type Status createdAt") // Select specific fields to return

    if (!notifications || notifications.length === 0) {
        return res.status(404).json(new ApiResponse(404, [], "No notifications found for the user"));
    }

    res.status(200).json(
        new ApiResponse(200, notifications, "Notifications retrieved successfully")
    );
});


export {
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
}