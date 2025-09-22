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
  verifyAccount,
  authorizeRoles("admin"),

  createComponent
);
router.get(
  "/get",
  verifyToken,
  verifyAccount,
  authorizeRoles("user", "admin"),

  getComponents
);
router.patch(
  "/update",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),

  updateComponent
);
router.delete(
  "/delete",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  deleteComponents
);

export default router;
