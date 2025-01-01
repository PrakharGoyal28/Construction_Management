import express from "express";
import {
    addProject,
    deleteProject,
    getProjectDetails,
    updateProject
} from "../controllers/project.controller.js";
import { checkRole } from "../middlewares/auth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", verifyJWT, checkRole, addProject);
router.get("/project/:projectId", getProjectDetails);
router.delete("/delete/:projectId", verifyJWT, checkRole, deleteProject);
router.put("/update/:projectId", verifyJWT, checkRole, updateProject);

export default router;
