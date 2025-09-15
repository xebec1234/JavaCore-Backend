import { Router } from "express";
import { createUser } from "../controllers/auth.controller";

const router = Router();

router.post("/create", createUser)

export default router;