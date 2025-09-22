import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import { getComponentClientAction } from "../../controllers/route-list/component-client-action.controller";

const router = Router();

router.get(
  "/get",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin", "user"),
  getComponentClientAction
);

export default router;
