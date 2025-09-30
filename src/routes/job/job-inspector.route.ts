import { Router } from "express";
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import verifyAccount from "../../middleware/verifyMiddleware";
import { getInspector, createInspector, deleteInspectors } from "../../controllers/job/job-inspector.controller";

const router = Router();

router.get("/get", verifyToken, verifyAccount,authorizeRoles("admin", "user"), getInspector);
router.post("/create", verifyToken, verifyAccount,authorizeRoles("admin"), createInspector);
router.delete("/delete", verifyToken, verifyAccount,authorizeRoles("admin"), deleteInspectors);

export default router;