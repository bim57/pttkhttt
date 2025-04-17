import express from "express";
import * as taiKhoanController from "../controllers/taiKhoanController.js";

const router = express.Router();

// Trang quản lý tài khoản
router.get("/", taiKhoanController.getAccountsPage);

// API tạo, cập nhật, xóa tài khoản
router.post("/create", taiKhoanController.createAccount);
router.post("/update", taiKhoanController.updateAccount);
router.delete("/delete/:id", taiKhoanController.deleteAccount);

export default router;
