import { Router } from "express";
import { login, logout, getSession } from "../controllers/auth.controller";

const router = Router();

router.post("/login", login)
router.post("/logout", logout)
router.get("/session", getSession);

export default router;