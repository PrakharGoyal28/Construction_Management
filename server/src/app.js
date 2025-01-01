import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Router } from "express";

const app=express()


app.use(express.json({limit:"100kb"}))
app.use(express.urlencoded({extended:true,limit:"100kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// routes import
import userRouter from "./routes/user.routes.js"
import labourRouter from "./routes/labour.routes.js"
import projectRouter from "./routes/project.routes.js"
import materialRouter from "./routes/material.routes.js"






//route declar
// app.use("/",home) TODO: add home route
app.use("/api/v1/users",userRouter)
app.use("/api/v1/labours",labourRouter)
app.use("/api/v1/projects",projectRouter)
app.use('/api/v1/materials',materialRouter)

export{app}