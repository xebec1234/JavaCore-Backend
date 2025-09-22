import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";
import {
  createArea,
  getAreas,
  getAreaById,
  updateArea,
  deleteAreas,
} from "../../controllers/machine-list/area.controller";

const router = Router();

router.post("/create", verifyToken, authorizeRoles("admin"), createArea);
router.get("/get", verifyToken, verifyAccount, authorizeRoles("user","admin"), getAreas);
router.get("/get/:id", verifyToken, authorizeRoles("user","admin"), getAreaById);
router.patch("/update", verifyToken, authorizeRoles("admin"), updateArea);
router.delete("/delete", verifyToken, authorizeRoles("admin"), deleteAreas);

export default router;
