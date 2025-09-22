import { requestOtp, unverifiedUser, verifyDevice, verifyUser } from "../controllers/verify.controller";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";
import verifyAccount from "../middleware/verifyMiddleware";

const router = Router();

router.patch('/client/:id', verifyToken, verifyAccount, authorizeRoles("admin"), verifyUser)
router.get('/unverified', verifyToken, verifyAccount, authorizeRoles("admin"), unverifiedUser)
router.post('/device', verifyToken, authorizeRoles("user", "admin"), verifyDevice)
router.post('/request-otp', verifyToken, authorizeRoles("user", "admin"), requestOtp)

export default router;