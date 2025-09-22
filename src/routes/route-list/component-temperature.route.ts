import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";

import {
  getRouteComponentTemperatures,
  createRouteComponentTemperature,
} from "../../controllers/route-list/component-temperature.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  authorizeRoles("admin"),
  createRouteComponentTemperature
);
router.get(
  "/get",
  verifyToken, 
  authorizeRoles("admin", "user"),
  getRouteComponentTemperatures
);

export default router;
