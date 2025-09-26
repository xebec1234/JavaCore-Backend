import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import { getSeverities } from "../../controllers/route-list/component-severities.controller";

const router = Router();

router.get(
  "/get",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  getSeverities
);

export default router;
