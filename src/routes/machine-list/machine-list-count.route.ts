import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";
import { getCounts } from "../../controllers/machine-list/machine-list-count.controller";

const router = Router();

router.get(
  "/counts",
  verifyToken,
  verifyAccount,
  authorizeRoles("user", "admin"),
  getCounts
);

export default router;
