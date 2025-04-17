import * as TaiKhoanModel from '../models/taiKhoan.model.js';
import * as RoleModel from '../models/role.model.js';

// Lấy danh sách người dùng
export const getUsers = async (req, res) => {
  try {
    const users = await TaiKhoanModel.getAllAccounts();
    res.render('admin', {
      users: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi lấy danh sách người dùng');
  }
};

// Thêm người dùng mới
export const addUser = async (req, res) => {
  const { ID_NhanVien, ID_NhomQuyen, MatKhau } = req.body;
  try {
    await TaiKhoanModel.createAccount(ID_NhanVien, ID_NhomQuyen, MatKhau);
    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi thêm người dùng');
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (req, res) => {
  const { ID_TK, ID_NhomQuyen, MatKhau } = req.body;
  try {
    await TaiKhoanModel.updateAccount(ID_TK, ID_NhomQuyen, MatKhau);
    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi cập nhật người dùng');
  }
};

// Xóa người dùng
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await TaiKhoanModel.deleteAccount(id);
    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi xóa người dùng');
  }
};

export const getRolesAndPermissions = async (req, res) => {
  try {
    const roles = await RoleModel.getAllRoles();
    const permissions = await RoleModel.getPermissionsByRole(someRoleId); // Cập nhật roleId phù hợp
    res.render('rolesAndPermissionsPage', { roles, permissions });
  } catch (error) {
    console.error("Lỗi khi lấy quyền và nhóm quyền:", error);
    res.status(500).send("Có lỗi khi tải thông tin quyền");
  }
};
