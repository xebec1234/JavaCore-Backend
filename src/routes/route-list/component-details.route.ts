import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {
  getRouteComponentDetails,
  createRouteComponentDetails,
  updateRouteComponentDetails,
  deleteRouteComponentDetails
} from "../../controllers/route-list/component-details.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  createRouteComponentDetails
);
router.get(
  "/get",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin", "user"),
  getRouteComponentDetails
);
router.put(
  "/update/:id",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin", "user"),
  updateRouteComponentDetails
);
router.delete(
  "/delete/:id",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin", "user"),
  deleteRouteComponentDetails
);

export default router;
