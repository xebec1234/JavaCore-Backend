import Router from "express"
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import { getReportFigure, deleteReportFigure, createReportFigure } from "../../controllers/route-list/component-report-figures.controller";
import { upload } from "../../util/multer";
import verifyAccount from "../../middleware/verifyMiddleware";

const router = Router();

router.post("/create", verifyToken, verifyAccount, authorizeRoles("admin","user"), upload.array("files"), createReportFigure)
router.get("/get", verifyToken, verifyAccount, authorizeRoles("admin","user"), getReportFigure)
router.delete("/delete/:id", verifyToken, verifyAccount, authorizeRoles("admin","user"), deleteReportFigure)

export default router;