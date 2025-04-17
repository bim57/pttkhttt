import * as TaiKhoanModel from "../models/taiKhoan.model.js";
import * as RoleModel from "../models/role.model.js"; // để lấy danh sách nhóm quyền

// Trang quản lý tài khoản người dùng
export const getAccountsPage = async (req, res) => {
  try {
    const accounts = await TaiKhoanModel.getAllAccounts();
    const roles = await RoleModel.getAllRoles();

    res.render("userManager", {
      title: "Quản lý tài khoản",
      accounts,
      roles,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tài khoản:", error);
    res.status(500).send("Có lỗi khi tải trang tài khoản");
  }
};

// Thêm tài khoản mới
export const createAccount = async (req, res) => {
  const { ID_NhanVien, ID_NhomQuyen, MatKhau } = req.body;

  try {
    const result = await TaiKhoanModel.createAccount(ID_NhanVien, ID_NhomQuyen, MatKhau);
    res.status(201).json({ message: "Tạo tài khoản thành công", id: result.insertId });
  } catch (error) {
    console.error("Lỗi khi tạo tài khoản:", error);
    res.status(500).json({ message: "Tạo tài khoản thất bại" });
  }
};

// Cập nhật tài khoản
export const updateAccount = async (req, res) => {
  const { ID_TK, ID_NhomQuyen, MatKhau } = req.body;

  try {
    await TaiKhoanModel.updateAccount(ID_TK, ID_NhomQuyen, MatKhau);
    res.json({ message: "Cập nhật tài khoản thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật tài khoản:", error);
    res.status(500).json({ message: "Cập nhật tài khoản thất bại" });
  }
};

// Xóa tài khoản
export const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    await TaiKhoanModel.deleteAccount(id);
    res.json({ message: "Xóa tài khoản thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa tài khoản:", error);
    res.status(500).json({ message: "Xóa tài khoản thất bại" });
  }
};
