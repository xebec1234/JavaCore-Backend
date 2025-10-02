import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {
  createRoute,
  deleteRoutes,
  getAllRoutes,
  getRoutes,
} from "../../controllers/route-list/route-list.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  createRoute
);
router.get(
  "/get",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  getRoutes
);

router.get(
  "/get/all",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  getAllRoutes
)

router.delete(
  "/delete",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  deleteRoutes
)

export default router;
