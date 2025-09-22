import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {
  createComponent,
  getComponents,
  updateComponent,
  deleteComponents,
} from "../../controllers/machine-list/component.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  authorizeRoles("admin"),
  verifyAccount,
  createComponent
);
router.get(
  "/get",
  verifyToken,
  authorizeRoles("user", "admin"),
  verifyAccount,
  getComponents
);
router.patch(
  "/update",
  verifyToken,
  authorizeRoles("admin"),
  verifyAccount,
  updateComponent
);
router.delete(
  "/delete",
  verifyToken,
  authorizeRoles("admin"),
  deleteComponents
);

export default router;
