import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";

import { getRouteComponentOilAnalyses, createRouteComponentOilAnalysis } from "../../controllers/route-list/component-oil-analysis.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  authorizeRoles("admin"),
  createRouteComponentOilAnalysis
);
router.get(
  "/get",
  verifyToken, 
  authorizeRoles("admin", "user"),
  getRouteComponentOilAnalyses
);

export default router;
