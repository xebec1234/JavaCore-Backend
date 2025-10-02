import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {
  getRouteComponentComments,
  createRouteComponentComment,
  updateLatestRouteComponentComment,
} from "../../controllers/route-list/route-component-comment.controller";

const router = Router();

router.get(
  "/get",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin", "user"),
  getRouteComponentComments
);
router.post(
  "/create",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  createRouteComponentComment
);
router.put(
  "/update",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  updateLatestRouteComponentComment
);

export default router;
