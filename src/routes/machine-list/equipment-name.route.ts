import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {
  createEquipmentName,
  getEquipmentNames,
  updateEquipmentName,
  deleteEquipmentNames,
} from "../../controllers/machine-list/equipment-name.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  createEquipmentName
);
router.get(
  "/get",
  verifyToken,
  verifyAccount,
  authorizeRoles("user", "admin"),
  getEquipmentNames
);
router.patch(
  "/update",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  updateEquipmentName
);
router.delete(
  "/delete",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  deleteEquipmentNames
);

export default router;
