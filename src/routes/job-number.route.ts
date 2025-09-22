import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";
import verifyAccount from "../middleware/verifyMiddleware";
import { getJobsBySearch } from "../controllers/job-number.controller";

const router = Router();

router.get(
  "/search",
  verifyToken,
  authorizeRoles("admin"),
  verifyAccount,
  getJobsBySearch
);

export default router;
