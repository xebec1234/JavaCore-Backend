import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import {
  createComponent,
  getComponents,
  updateComponent,
  deleteComponents,
} from "../../controllers/machine-list/component.controller";

const router = Router();

router.post("/create", verifyToken, authorizeRoles("admin"), createComponent);
router.get("/get", verifyToken, authorizeRoles("user", "admin"), getComponents);
router.patch("/update", verifyToken, authorizeRoles("admin"), updateComponent);
router.delete(
  "/delete",
  verifyToken,
  authorizeRoles("admin"),
  deleteComponents
);

export default router;
