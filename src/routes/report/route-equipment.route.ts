import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";

import {getRouteEquipment} from "../../controllers/report/route-equipment.controller";

const router = Router();

router.get("/get", verifyToken, verifyAccount, authorizeRoles("user","admin"), getRouteEquipment);

export default router;