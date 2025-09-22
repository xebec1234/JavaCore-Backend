import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import { getRouteEquipmentList } from "../../controllers/route-list/route-equipment-list.controller";

const router = Router();

router.get(
  "/get",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin", "user"),
  getRouteEquipmentList
);

export default router;
