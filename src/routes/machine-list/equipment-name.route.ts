import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
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
  createEquipmentName
);
router.get(
  "/get",
  verifyToken,
  authorizeRoles("user", "admin"),
  getEquipmentNames
);
router.patch(
  "/update",
  verifyToken,
  authorizeRoles("admin"),
  updateEquipmentName
);
router.delete(
  "/delete",
  verifyToken,
  authorizeRoles("admin"),
  deleteEquipmentNames
);

export default router;
