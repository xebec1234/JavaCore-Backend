import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import { postReportIntroduction } from "../../controllers/report/report-introduction.controller";

const router = Router();

router.post("/post", verifyToken, verifyAccount, authorizeRoles("admin"), postReportIntroduction);

export default router;