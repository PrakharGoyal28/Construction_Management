import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Router } from "express";

const app=express()


app.use(express.json({limit:"100kb"}))
app.use(express.urlencoded({extended:true,limit:"100kb"}))
app.use(express.static("public"))
app.use(cookieParser())

export{app}