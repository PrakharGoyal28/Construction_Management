import mongoose from "mongoose";


const connectDB=async()=>{
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/construction-backend`);
        console.log(`mondodb connected !! DB host ${connectionInstance.connection.host} \n connectionInstance:-,${connectionInstance}`);
    } catch (error) {
        console.log("mongo db connection error", error);
        process.exit(1)
    }
}

export default connectDB