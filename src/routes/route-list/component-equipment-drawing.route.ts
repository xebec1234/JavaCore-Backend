import Router from "express"
import verifyToken from "../../middleware/authMiddleware";
import authorizeRoles from "../../middleware/roleMiddleware";
import { createEquipmentDrawing, deleteEquipmentDrawing, getEquipmentDrawing } from "../../controllers/route-list/component-equipment-drawing.controller";
import { upload } from "../../util/multer";
import verifyAccount from "../../middleware/verifyMiddleware";

const router = Router();

router.post("/create", verifyToken, verifyAccount, authorizeRoles("admin", "user"), upload.array("files"), createEquipmentDrawing)
router.get("/get", verifyToken, verifyAccount, authorizeRoles("admin", "user"), getEquipmentDrawing)
router.delete("/delete/:id", verifyToken, verifyAccount, authorizeRoles("admin", "user"), deleteEquipmentDrawing)

export default router;