import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {
  createComponentAnalystNote,
  getComponentAnalystNote,
} from "../../controllers/route-list/component-analyst-note.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  verifyAccount,
  authorizeRoles("user"),
  createComponentAnalystNote
);
router.get(
  "/get",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin", "user"),
  getComponentAnalystNote
);

export default router;
