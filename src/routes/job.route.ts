import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";
import { createJob, deleteJobs, getJobs, getJobById, updateJob } from "../controllers/job.controller";

const router = Router();

router.post("/create", verifyToken, authorizeRoles("admin"), createJob)
router.get("/get", verifyToken, authorizeRoles("admin"), getJobs)
router.get("/get/:id", verifyToken, authorizeRoles("admin"), getJobById);
router.patch("/update", verifyToken, authorizeRoles("admin"), updateJob)
router.delete("/delete", verifyToken, authorizeRoles("admin"), deleteJobs)

export default router;