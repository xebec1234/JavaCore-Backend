import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";
import { getClients } from "../controllers/user.controller";

const router = Router();

router.get("/get", verifyToken, authorizeRoles("admin"), getClients)

// router.get("/admin", verifyToken, authorizeRoles("admin"), (req,res) => { res.json({ message: "This is Admin"} ) })
// router.get("/user", verifyToken, authorizeRoles("admin","user"), (req,res) => { res.json({ message: "This is User"} ) })

export default router;