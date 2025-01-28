import { Router } from "express";
import {
    registerLabour,
    updateAttendance,
    getLabourDetails,
    getAttendanceSummary,
    getLaboursByProjectId,
    getAllLabours
} from "../controllers/labour.controller.js"
import { checkRole } from "../middlewares/auth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

<<<<<<< Updated upstream
// router.post("/register",upload.single('image'), registerLabour);
=======
router.post("/register",upload.single("image"), registerLabour);
>>>>>>> Stashed changes
// Route to update attendance for a specific labour
router.post("/updateAttendance", verifyJWT, checkRole, updateAttendance);
// Route to get attendance history for a specific labour
router.get("/labourDetails/:labourId", getLabourDetails);
router.get("/alllabours",getAllLabours);
router.get("/labours/:projectId", getLaboursByProjectId);
router.get("/attendanceSummary",getAttendanceSummary);
router.get("/labours/all/abc", getAllLabours);

export default router;
