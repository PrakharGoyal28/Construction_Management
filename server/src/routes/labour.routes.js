import { Router } from "express";
import {
    registerLabour,
    updateAttendance,
    getLabourDetails,
    getLaboursByProjectId
} from "../controllers/labour.controller.js"
import { checkRole } from "../middlewares/auth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", verifyJWT, checkRole, registerLabour);
// Route to update attendance for a specific labour
router.post("/updateAttendance", verifyJWT, checkRole, updateAttendance);
// Route to get attendance history for a specific labour
router.get("/labourDetails/:labourId", getLabourDetails);
router.get("/labours/:projectId", getLaboursByProjectId);

export default router;
