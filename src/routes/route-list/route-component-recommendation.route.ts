import Router from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {
  createRouteComponentRecommendation,
  getRouteComponentRecommendations,
  updateLatestRouteComponentRecommendation,
} from "../../controllers/route-list/route-component-recommendation.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  createRouteComponentRecommendation
);
router.get(
  "/get",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin", "user"),
  getRouteComponentRecommendations
);
router.put(
  "/update",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  updateLatestRouteComponentRecommendation
);

export default router;
