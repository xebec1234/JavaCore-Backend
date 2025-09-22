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
  authorizeRoles("admin"),
  verifyAccount,
  createEquipmentName
);
router.get(
  "/get",
  verifyToken,
  authorizeRoles("user", "admin"),
  verifyAccount,
  getEquipmentNames
);
router.patch(
  "/update",
  verifyToken,
  authorizeRoles("admin"),
  verifyAccount,
  updateEquipmentName
);
router.delete(
  "/delete",
  verifyToken,
  authorizeRoles("admin"),
  verifyAccount,
  deleteEquipmentNames
);

export default router;
