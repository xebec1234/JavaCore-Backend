import { Router } from "express";
import { 
    login, 
    logout, 
    refreshToken 
} from "../controllers/auth.controller";
import verifyToken from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";
import { getCurrentUser } from "../controllers/user.controller";
import verifyAccount from "../middleware/verifyMiddleware";

const router = Router();

router.post("/login", login)
router.post("/logout", verifyToken, verifyAccount, authorizeRoles("user","admin"), logout)
router.get("/me", verifyToken, authorizeRoles("user","admin"), getCurrentUser)
router.post("/refresh-token", refreshToken)

export default router;