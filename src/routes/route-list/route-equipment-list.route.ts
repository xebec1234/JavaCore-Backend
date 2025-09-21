import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import { getRouteEquipmentList } from "../../controllers/route-list/route-equipment-list.controller";

const router = Router();

router.get(
  "/get",
  verifyToken,
  authorizeRoles("admin", "user"),
  getRouteEquipmentList
);

export default router;
