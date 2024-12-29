import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { deletCloudinary, uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponce } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshToken= async (userid)=>{
    try {
        const user=await User.findById(userid)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
        user.refreshToken=refreshToken

        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"something went wrong when creating access and refresh token")
    }
}

const registerUser =asyncHandler( async (req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists:  email
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

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
        contact:contactNo
    })

    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"something went wrong while creating the user")
    }

    return res.status(201).json(
        new ApiResponce(200,createdUser,"user registered successfully")
    )

})

const loginUser=asyncHandler(async (req,res)=>{
    //get user detail from frontend
    //validate if entries are not empty
    //find user in database 
    //validate password
    //generate access and refresh token
    //send cookie
    //login user

    const {email,password}=req.body

    if(!email) throw new ApiError(400,"email or username is required")

    const user = await User.findOne({
        $or:[{email}]
    })
    if(!user) throw new ApiError(404,"user not found register")

    const isPassValid= await user.isPasswordCorrect(password)
    if(!isPassValid) throw new ApiError(401,"invalid user password")

    const {accessToken,refreshToken}= await generateAccessAndRefreshToken(user._id)
    
    const loggedInUser= await User.findById(user._id).select("-password -refreshToken")
    res.cookie("setmycookie","this is my cookie")
    const options={
        httpOnly:true,
        secure:true
    }
    console.log("user logged in ");
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponce(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "user logged in successfuly"
        )
    )
})

const logoutUser=asyncHandler(async(req,res)=>{
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset:{
                    refreshToken:1
                }
            },
            {
                new:true
            }
        )
        const options={
            httpOnly:true,
            secure:true
        }
        return res.status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponce(200,{},"User logged out"))
})

const refreshAccessToken=asyncHandler(async (req,res)=>{
    const incomingAccessToken=req.cookies.refreshToken || req.body.refreshToken
    if(!incomingAccessToken){
        throw new ApiError(401,"unautorized access")
    }
    const decodedToken= jwt.verify(incomingAccessToken,process.env.REFRESH_TOKEN_SECRECT)

    const user =await User.findById(decodedToken?._id)
    if(user){
        throw new ApiError(401,"invalid refresh token")
    }
    
    if(incomingAccessToken!==user?.refreshToken){
        throw new ApiError(401,"refresh token is expired")
    }

    const options={
        httpOnly:true,
        secure:true
    }
    const {accessToken,newRefreshToken}= await generateAccessAndRefreshToken(user._id)
    console.log("refreshAccessToken");
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",newRefreshToken,options)
    .json(
        new ApiResponce(
            200,
            {
                accessToken,refreshToken:newRefreshToken
            },
            "access token refreshed"
        )
    )

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
        new ApiResponce(200,{},"password changes successfully")
    )
})

const getCurrentUser=asyncHandler(async(req,res)=>{
    return res.status(200)
    .json(new ApiResponce(200,req.user,"current user exported"))
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
    .json(new ApiResponce(200,user,"Account detail updated"))

})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
}