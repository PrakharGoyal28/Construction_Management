import express from "express";
import {
    addProject,
    deleteProject,
    updateProject
} from "../controllers/project.controller.js";
import { checkRole } from "../middlewares/auth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", verifyJWT, checkRole, addProject);


router.delete("/delete/:projectId", deleteProject);


router.put("/update/:projectId", updateProject);

export default router;
