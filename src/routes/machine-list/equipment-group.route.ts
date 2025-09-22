import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {
  createEquipmentGroup,
  getEquipmentGroups,
  updateEquipmentGroup,
  deleteEquipmentGroups,
} from "../../controllers/machine-list/equipment-group.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  createEquipmentGroup
);
router.get(
  "/get",
  verifyToken,
  verifyAccount,
  authorizeRoles("user", "admin"),
  getEquipmentGroups
);
router.patch(
  "/update",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  updateEquipmentGroup
);
router.delete(
  "/delete",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  deleteEquipmentGroups
);

export default router;
