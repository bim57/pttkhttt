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
