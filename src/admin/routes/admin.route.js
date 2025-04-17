import express from "express";
import * as adminController from "../controllers/adminController.js";

const router = express.Router();

// Route GET cho trang chính của admin
router.get("/", adminController.getAdminPage);

// Route GET cho trang quản lý phân quyền
router.get("/roles", adminController.getRolePage);  // Trang phân quyền

// API lấy quyền chi tiết theo nhóm quyền (AJAX)
router.get("/permissions/:id", adminController.getPermissions);  // Lấy quyền chi tiết theo nhóm quyền

// API cập nhật quyền (POST)
router.post("/permissions/update", adminController.updatePermissions);  // Cập nhật quyền

export default router;
