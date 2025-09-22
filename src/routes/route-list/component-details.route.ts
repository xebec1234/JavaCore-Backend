import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {
  getRouteComponentDetails,
  createRouteComponentDetails,
} from "controllers/route-list/component-details.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  authorizeRoles("user"),
  verifyAccount,
  createRouteComponentDetails
);
router.get(
  "/get",
  verifyToken,
  authorizeRoles("admin", "user"),
  verifyAccount,
  getRouteComponentDetails
);

export default router;
