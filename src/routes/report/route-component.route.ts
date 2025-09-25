import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {getRouteComponent} from "../../controllers/report/route-component.controller";

const router = Router();

router.get("/get", verifyToken, verifyAccount, authorizeRoles("user","admin"), getRouteComponent);

export default router;