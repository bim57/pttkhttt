import express from "express";
import * as roleController from "../controllers/roleController.js";

const router = express.Router();

router.get("/", roleController.getRolePage);
router.get("/permissions/:id", roleController.getPermissions);
router.post("/permissions/update", roleController.updatePermissions);

export default router;
