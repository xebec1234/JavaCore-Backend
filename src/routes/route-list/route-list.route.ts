import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import {
  createRoute,
  getRoutes,
} from "../../controllers/route-list/route-list.controller";

const router = Router();

router.post("/create", verifyToken, authorizeRoles("admin"), createRoute);
router.get("/get", verifyToken, authorizeRoles("admin"), getRoutes);

export default router;
