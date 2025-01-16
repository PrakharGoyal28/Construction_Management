import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// Users Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: Number, required: true },//phone number
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['Supervisor', 'Admin'], required: true },
    refreshToken: {
        type: String
    }
},{timestamps:true});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRECT,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRECT,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)