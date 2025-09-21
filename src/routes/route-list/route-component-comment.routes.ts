import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import {getRouteComponentComments, createRouteComponentComment} from "../../controllers/route-list/route-component-comment.controller";

const router = Router();

router.get(
  "/get",
  verifyToken,
  authorizeRoles("admin", "user"),
  getRouteComponentComments
);
router.post(
  "/create",
  verifyToken,
  authorizeRoles("admin"),
  createRouteComponentComment
);

export default router;