import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";
import verifyAccount from "../middleware/verifyMiddleware";
import {
  createJob,
  deleteJobs,
  getJobs,
  getJobById,
  updateJob,
  clienUpdateJob,
  getUserJobs,
} from "../controllers/job.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  createJob
);
router.get(
  "/get",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  getJobs
);
router.get(
  "/get/:id",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  getJobById
);
router.patch(
  "/update",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  updateJob
);
router.patch(
  "/client-update",
  verifyToken,
  verifyAccount,
  authorizeRoles("user"),
  clienUpdateJob
);
router.delete(
  "/delete",
  verifyToken,
  verifyAccount,
  authorizeRoles("admin"),
  deleteJobs
);

router.get(
  "/user-job",
  verifyToken,
  verifyAccount,
  authorizeRoles("user", "admin"),
  getUserJobs
);

export default router;
