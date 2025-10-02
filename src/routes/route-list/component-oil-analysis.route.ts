import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {
  getRouteComponentOilAnalyses,
  createRouteComponentOilAnalysis,
  updateLatestRouteComponentOilAnalyses,
} from "../../controllers/route-list/component-oil-analysis.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  createRouteComponentOilAnalysis
);
router.get(
  "/get",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin", "user"),
  getRouteComponentOilAnalyses
);
router.put(
  "/update",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  updateLatestRouteComponentOilAnalyses
);

export default router;
