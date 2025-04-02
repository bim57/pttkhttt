import express from "express";
import orderController from "../controllers/OrderController.js";

const router = express.Router();

router.get("/show", orderController.show);
router.get("/:id/exportPdf", orderController.exportOrderPdf);
router.post("/:id/confirm", orderController.updateStatus);
router.post("/:id/cancel", orderController.updateStatus);
router.post("/:id/archive", orderController.updateArchive);
router.post("/:id/unarchive", orderController.updateArchive);
router.get("/:id", orderController.showById);
export default router;
