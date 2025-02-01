import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Router } from "express";

import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'

import { Inventory } from "./models/inventry.model.js";
import { Labour } from "./models/labour.model.js";
import { Material } from "./models/Material.model.js";
import { User } from "./models/user.model.js";
import { Vendor } from "./models/vendor.model.js";
import { Project } from "./models/project.model.js";
import { Task } from "./models/Task.model.js";



AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
})

const adminOptions = {
    resources: [
        Inventory,Labour,Material,User,Vendor,Project,Task
    ],
}


const app=express()

app.use(cors({
    origin: "*", // Replace with your frontend's URL
    credentials: true, // Enable cookies or credentials
}));

app.use(express.json({limit:"100kb"}))
app.use(express.urlencoded({extended:true,limit:"100kb"}))
app.use(express.static("public"))
app.use(cookieParser())


const admin = new AdminJS(adminOptions)
const adminRouter = AdminJSExpress.buildRouter(admin)
app.use(admin.options.rootPath, adminRouter)


import userRouter from "./routes/user.routes.js"
import labourRouter from "./routes/labour.routes.js"
import projectRouter from "./routes/project.routes.js"
import materialRouter from "./routes/material.routes.js"
import inventoryRouter from "./routes/inventory.routes.js"
import projectFinanceRouter from "./routes/projectFinance.routes.js"
import transactionRouter from "./routes/transaction.routes.js"
import purchaseOrderRouter from "./routes/purchaseOrder.routes.js"
import approvalRouter from "./routes/approval.routes.js"
import notificationRouter from "./routes/notification.routes.js"
import reportRouter from "./routes/report.routes.js"
import vendorRouter from "./routes/vendor.routes.js"
import taskRouter from "./routes/task.routes.js"
import scheduleRouter from "./routes/schedule.routes.js"




app.get("/",(req,res)=>{
    res.send("Welcome to the construction management system")
})
app.use("/api/v1/users",userRouter)
app.use("/api/v1/labours",labourRouter)
app.use("/api/v1/projects",projectRouter)
app.use("/api/v1/materials",materialRouter)
app.use("/api/v1/inventory",inventoryRouter)
app.use("/api/v1/projectfinance",projectFinanceRouter)
app.use("/api/v1/transaction",transactionRouter)
app.use("/api/v1/purchaseOrder",purchaseOrderRouter)
app.use("/api/v1/approval",approvalRouter)
app.use("/api/v1/notification",notificationRouter)
app.use("/api/v1/report",reportRouter)
app.use("/api/v1/vendor",vendorRouter)
app.use("/api/v1/task",taskRouter)
app.use("/api/v1/schedule",scheduleRouter)






export{app}