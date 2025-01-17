import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Router } from "express";

const app=express()


app.use(express.json({limit:"100kb"}))
app.use(express.urlencoded({extended:true,limit:"100kb"}))
app.use(express.static("public"))
app.use(cookieParser())


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