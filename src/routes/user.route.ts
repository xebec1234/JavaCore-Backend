import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";
import { 
    changePassword, 
    getClients, 
    register
} from "../controllers/user.controller";
import verifyAccount from "../middleware/verifyMiddleware";

const router = Router();

router.get("/get", verifyToken, verifyAccount, authorizeRoles("admin"), getClients)
router.post("/register", verifyToken, verifyAccount, authorizeRoles("admin"), register)
router.post("/change-password", verifyToken, verifyAccount, authorizeRoles("user","admin"), changePassword)

// router.get("/admin", verifyToken, authorizeRoles("admin"), (req,res) => { res.json({ message: "This is Admin"} ) })
// router.get("/user", verifyToken, authorizeRoles("admin","user"), (req,res) => { res.json({ message: "This is User"} ) })

export default router;