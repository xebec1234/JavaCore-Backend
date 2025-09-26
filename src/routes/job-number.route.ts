import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";
import verifyAccount from "../middleware/verifyMiddleware";
import {
  getJobsBySearch,
  getClientJobsBySearch,
} from "../controllers/job-number.controller";

const router = Router();

router.get(
  "/search",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  getJobsBySearch
);
router.get(
  "/clientSearch",
  verifyToken,
  verifyAccount,
  authorizeRoles("user"),
  getClientJobsBySearch
);

export default router;
