import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";
import { getJobsBySearch } from "../controllers/job-number.controller";

const router = Router();

router.get("/search", verifyToken, authorizeRoles("admin"), getJobsBySearch);

export default router;

