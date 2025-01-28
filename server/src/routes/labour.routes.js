import { Router } from "express";
import {
    registerLabour,
    updateAttendance,
    getLabourDetails,
    getAttendanceSummary,
    getLaboursByProjectId,
    getAllLabours,
    verifyembedding
} from "../controllers/labour.controller.js"
import { checkRole } from "../middlewares/auth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/register",upload.single("image"), registerLabour);
// Route to update attendance for a specific labour
router.post("/verifyembedding",upload.single("image"),verifyembedding);

router.post("/updateAttendance", verifyJWT, checkRole, updateAttendance);
// Route to get attendance history for a specific labour
router.get("/labourDetails/:labourId", getLabourDetails);
router.get("/alllabours",getAllLabours);
router.get("/labours/:projectId", getLaboursByProjectId);
router.get("/attendanceSummary",getAttendanceSummary);
router.get("/labours/all/abc", getAllLabours);

export default router;
