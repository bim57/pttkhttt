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

// Lấy tất cả nhóm quyền và quyền mặc định theo nhóm đầu tiên
export const getRolesAndPermissions = async (req, res) => {
  try {
    const roles = await RoleModel.getAllRoles();
    const defaultRoleId = roles[0]?.ID_NhomQuyen;
    const permissions = defaultRoleId
      ? await RoleModel.getPermissionsByRole(defaultRoleId)
      : [];
    res.render('rolesAndPermissionsPage', { roles, permissions });
  } catch (error) {
    console.error("Lỗi khi lấy quyền và nhóm quyền:", error);
    res.status(500).send("Có lỗi khi tải thông tin quyền");
  }
};

// Lấy danh sách quyền theo ID nhóm quyền
export const getPermissions = async (req, res) => {
  const { idRole } = req.params;
  try {
    const permissions = await RoleModel.getPermissionsByRole(idRole);
    res.json(permissions); // gửi dữ liệu JSON về cho frontend
  } catch (error) {
    console.error("Lỗi khi lấy quyền theo nhóm quyền:", error);
    res.status(500).json({ error: 'Lỗi khi lấy quyền' });
  }
};

// Cập nhật quyền cho nhóm quyền
export const updatePermissions = async (req, res) => {
  const { idRole, permissions } = req.body;
  try {
    await RoleModel.updatePermissionsByRole(idRole, permissions);
    res.status(200).json({ message: 'Cập nhật quyền thành công' });
  } catch (error) {
    console.error("Lỗi khi cập nhật quyền:", error);
    res.status(500).json({ error: 'Lỗi khi cập nhật quyền' });
  }
};
