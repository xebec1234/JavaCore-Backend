import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";
import { changePassword, getClients, getMe, register } from "../controllers/user.controller";

const router = Router();

router.get("/me", verifyToken, authorizeRoles("user","admin"), getMe)
router.get("/get", verifyToken, authorizeRoles("admin"), getClients)
router.post("/register", verifyToken, authorizeRoles("admin"), register)
router.post("/change-password", verifyToken, authorizeRoles("user","admin"), changePassword)

// router.get("/admin", verifyToken, authorizeRoles("admin"), (req,res) => { res.json({ message: "This is Admin"} ) })
// router.get("/user", verifyToken, authorizeRoles("admin","user"), (req,res) => { res.json({ message: "This is User"} ) })

export default router;