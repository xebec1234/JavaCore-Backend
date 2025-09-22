import Router from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {
  createRouteComponentRecommendation,
  getRouteComponentRecommendations,
} from "../../controllers/route-list/route-component-recommendation.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  authorizeRoles("admin"),
  verifyAccount,
  createRouteComponentRecommendation
);
router.get(
  "/get",
  verifyToken,
  authorizeRoles("admin", "user"),
  verifyAccount,
  getRouteComponentRecommendations
);

export default router;
