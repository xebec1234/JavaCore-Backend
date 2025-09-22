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
  authorizeRoles("admin"),
  verifyAccount,
  createEquipmentGroup
);
router.get(
  "/get",
  verifyToken,
  authorizeRoles("user", "admin"),
  verifyAccount,
  getEquipmentGroups
);
router.patch(
  "/update",
  verifyToken,
  authorizeRoles("admin"),
  verifyAccount,
  updateEquipmentGroup
);
router.delete(
  "/delete",
  verifyToken,
  authorizeRoles("admin"),
  verifyAccount,
  deleteEquipmentGroups
);

export default router;
