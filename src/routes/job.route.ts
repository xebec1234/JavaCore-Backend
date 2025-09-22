import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";
import verifyAccount from "../middleware/verifyMiddleware";
import { 
    createJob, 
    deleteJobs, 
    getJobs, 
    getJobById, 
    updateJob, 
    getUserJobs 
} from "../controllers/job.controller";

const router = Router();

router.post("/create", verifyToken, verifyAccount, authorizeRoles("admin"), createJob)
router.get("/get", verifyToken, authorizeRoles("admin"), getJobs)
router.get("/get/:id", verifyToken, authorizeRoles("admin"), getJobById);
router.patch("/update", verifyToken, authorizeRoles("admin"), updateJob)
router.delete("/delete", verifyToken, authorizeRoles("admin"), deleteJobs)

router.get("/user-job", verifyToken, authorizeRoles("user","admin"), getUserJobs)

export default router;