import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {
  getRouteComponentTemperatures,
  createRouteComponentTemperature,
} from "../../controllers/route-list/component-temperature.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  authorizeRoles("admin"),
  verifyAccount,
  createRouteComponentTemperature
);
router.get(
  "/get",
  verifyToken,
  authorizeRoles("admin", "user"),
  verifyAccount,
  getRouteComponentTemperatures
);

export default router;
