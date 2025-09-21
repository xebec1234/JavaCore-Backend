import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import { getRouteComponents } from "controllers/route-list/route-component.controller";

const router = Router();

router.get(
  "/get",
  verifyToken,
  authorizeRoles("admin", "user"),
  getRouteComponents
);

export default router;