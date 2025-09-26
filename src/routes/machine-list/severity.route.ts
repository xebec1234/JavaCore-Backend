import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";
import { getAllSeverities, getSeverities } from "../../controllers/machine-list/severity.controller";

const router = Router();

router.get("/get/all", verifyToken, verifyAccount, authorizeRoles("admin"), getAllSeverities)
router.get("/get", verifyToken, verifyAccount, authorizeRoles("user","admin"), getSeverities)

export default router;