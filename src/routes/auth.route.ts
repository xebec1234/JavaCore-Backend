import { Router } from "express";
import { 
    login, 
    logout, 
    refreshToken 
} from "../controllers/auth.controller";
import verifyToken from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";
import { getCurrentUser } from "../controllers/user.controller";

const router = Router();

router.post("/login", login)
router.post("/logout", logout)
router.get("/me", verifyToken, authorizeRoles("user","admin"), getCurrentUser)
router.post("/refresh-token", refreshToken)

export default router;