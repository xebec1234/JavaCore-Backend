import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";

import { getComponentAnalystNote } from "../../controllers/route-list/component-analyst-note.controller";

const router = Router();

router.get(
  "/get",
  verifyToken,
  authorizeRoles("admin", "user"),
  getComponentAnalystNote
);

export default router;