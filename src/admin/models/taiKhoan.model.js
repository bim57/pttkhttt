import db from "../../databasee/db.js"; // file kết nối CSDL mysql2

export const getAllAccounts = async () => {
  const [rows] = await db.execute(`
    SELECT tk.ID_TK, nv.TenNhanVien, nq.TenNhomQuyen
    FROM TaiKhoan tk
    JOIN NhanVien nv ON tk.ID_NhanVien = nv.IDNhanVien
    JOIN NhomQuyen nq ON tk.ID_NhomQuyen = nq.ID_NhomQuyen
  `);
  return rows;
};

export const createAccount = async (ID_NhanVien, ID_NhomQuyen, MatKhau) => {
  const [result] = await db.execute(
    `INSERT INTO TaiKhoan (ID_NhanVien, ID_NhomQuyen, MatKhau) VALUES (?, ?, ?)`,
    [ID_NhanVien, ID_NhomQuyen, MatKhau]
  );
  return result;
};

export const updateAccount = async (ID_TK, ID_NhomQuyen, MatKhau) => {
  const [result] = await db.execute(
    `UPDATE TaiKhoan SET ID_NhomQuyen = ?, MatKhau = ? WHERE ID_TK = ?`,
    [ID_NhomQuyen, MatKhau, ID_TK]
  );
  return result;
};

export const deleteAccount = async (ID_TK) => {
  const [result] = await db.execute(`DELETE FROM TaiKhoan WHERE ID_TK = ?`, [ID_TK]);
  return result;
};
