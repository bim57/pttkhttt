import db from "../../databasee/db.js";

// Lấy danh sách nhóm quyền
export const getAllRoles = async () => {
  const [rows] = await db.execute("SELECT * FROM NhomQuyen");
  return rows;
};

// Lấy danh sách chức năng
export const getAllFunctions = async () => {
  const [rows] = await db.execute("SELECT * FROM DanhMucChucNang");
  return rows;
};

// Lấy quyền theo nhóm
export const getPermissionsByRole = async (idRole) => {
  const [rows] = await db.execute(
    `SELECT * FROM ChiTietQuyen WHERE ID_NhomQuyen = ?`,
    [idRole]
  );
  return rows;
};

// Xóa hết quyền cũ trước khi cập nhật lại
export const deletePermissionsByRole = async (idRole) => {
  await db.execute(`DELETE FROM ChiTietQuyen WHERE ID_NhomQuyen = ?`, [idRole]);
};

// Thêm quyền mới cho nhóm quyền
export const addPermission = async (idRole, chucNang, hanhDong) => {
  await db.execute(
    `INSERT INTO ChiTietQuyen (ID_NhomQuyen, ChucNang, HanhDong) VALUES (?, ?, ?)`,
    [idRole, chucNang, hanhDong]
  );
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

