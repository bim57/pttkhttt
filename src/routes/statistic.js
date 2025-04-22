import express from "express";
import StatisticController from "../controllers/StatisticController.js";

const router = express.Router();

// Trang thống kê - server-side rendering
router.get("/", StatisticController.show);

// API xuất Excel
router.get("/api/export", StatisticController.exportToExcel);

export default router;
