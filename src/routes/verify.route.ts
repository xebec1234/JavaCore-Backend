import { verifyUser } from "../controllers/verify.controller";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";

const router = Router();

router.patch('/client/:id', verifyToken, authorizeRoles("admin"), verifyUser)

export default router;