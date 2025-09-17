import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";

const router = Router();

// router.post("/register", register) nasa user route ang register
router.post("/login", login)
router.post("/logout", logout)

export default router;