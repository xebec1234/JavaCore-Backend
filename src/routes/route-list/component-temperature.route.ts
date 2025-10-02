import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {
  getRouteComponentTemperatures,
  createRouteComponentTemperature,
  updateLatestRouteComponentTemperature
} from "../../controllers/route-list/component-temperature.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  createRouteComponentTemperature
);
router.get(
  "/get",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin", "user"),
  getRouteComponentTemperatures
);
router.put(
  "/update",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  updateLatestRouteComponentTemperature
);

export default router;
