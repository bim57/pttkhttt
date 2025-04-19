import * as TaiKhoanModel from '../models/taiKhoan.model.js';
import * as RoleModel from '../models/role.model.js';

// Quản lý người dùng
// Lấy danh sách người dùng
export const getUsers = async (req, res) => {
  try {
    const users = await TaiKhoanModel.getAllAccounts();
    res.render('admin', {
      users,
      isUsersPage: true // Gửi biến này để xác định hiển thị userManager partial
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
    // Kiểm tra xem người dùng đã tồn tại chưa (nếu có thể)
    const existingUser = await TaiKhoanModel.getAccountByNhanVien(ID_NhanVien);
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: 'Người dùng đã tồn tại' });
    }

    // Tạo tài khoản mới
    await TaiKhoanModel.createAccount(ID_NhanVien, ID_NhomQuyen, MatKhau);

    // Lấy lại thông tin tài khoản vừa tạo để trả về
    const [user] = await TaiKhoanModel.getAccountByNhanVien(ID_NhanVien);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }

    res.json({
      success: true,
      newUser: {
        ID_TK: user.ID_TK,
        TenNhanVien: user.TenNhanVien,
        TenQuyen: user.TenNhomQuyen
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi khi thêm người dùng', error: error.message });
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

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await TaiKhoanModel.deleteAccount(id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi khi xóa người dùng' });
  }
};

// Phân quyền chức năng
// Hiển thị trang quản lý phân quyền
export const getRolesAndPermissions = async (req, res) => {
  try {
    const roles = await RoleModel.getAllRoles();
    res.render('admin', {
      roles,
      isRolesPage: true // Gửi biến này để xác định hiển thị roleManager partial
    });
  } catch (error) {
    console.error("Lỗi khi lấy quyền và nhóm quyền:", error);
    res.status(500).send("Có lỗi khi tải thông tin quyền");
  }
};

export const addRole = async (req, res) => {
  const { TenNhomQuyen } = req.body;
  try {
    await RoleModel.addRole(TenNhomQuyen);
    res.json({ message: 'Thêm nhóm quyền thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi thêm nhóm quyền' });
  }
};

export const editRole = async (req, res) => {
  const { ID_NhomQuyen, TenNhomQuyen } = req.body;
  try {
    await RoleModel.updateRole(ID_NhomQuyen, TenNhomQuyen);
    res.json({ message: 'Cập nhật nhóm quyền thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi cập nhật nhóm quyền' });
  }
};

export const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    await RoleModel.deleteRole(id);
    res.json({ message: 'Xóa nhóm quyền thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi xóa nhóm quyền' });
  }
};

export const getFunctionList = async (req, res) => {
  try {
    const functions = await RoleModel.getAllFunctions();
    res.json(functions);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách chức năng:", error);
    res.status(500).json({ error: 'Lỗi khi lấy chức năng' });
  }
};

