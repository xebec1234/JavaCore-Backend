import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import {
  createEquipmentGroup,
  getEquipmentGroups,
  updateEquipmentGroup,
  deleteEquipmentGroups,
} from "../../controllers/machine-list/equipment-group.controller";

const router = Router();

router.post("/create", verifyToken, authorizeRoles("admin"), createEquipmentGroup);
router.get("/get", verifyToken, authorizeRoles("user", "admin"), getEquipmentGroups);
router.patch("/update", verifyToken, authorizeRoles("admin"), updateEquipmentGroup);
router.delete("/delete", verifyToken, authorizeRoles("admin"), deleteEquipmentGroups);

export default router;
