import db from "../database/mysql.database.js";
import { BaseModel } from "./BaseModel.js";

class Product extends BaseModel {
  constructor() {
    super("SanPham", "SanPhamID");
  }

  async getTopProductsByDateRange(startDate, endDate = null) {
    try {
      let sql = `SELECT GROUP_CONCAT(tg.TenTacGia SEPARATOR ', ') as DSTG , sp.*, SUM(cthdx.SoLuong) as DaBan,  SUM(cthdn.SoLuong) AS TongSL, anhsp.Anh
               FROM sanpham sp
               INNER JOIN chitiethoadonxuat cthdx ON cthdx.IDSanPham = sp.SanPhamID
               INNER JOIN hoadonxuat hdx ON hdx.IDHoaDonXuat = cthdx.IDHoaDonXuat
               INNER JOIN chitiethoadonnhap cthdn ON cthdn.IDSanPham = sp.SanPhamID
               INNER JOIN giaohang gh ON gh.ID_HDX = hdx.IDHoaDonXuat
               INNER JOIN anhsp ON anhsp.ID_SP = sp.SanPhamID
               INNER JOIN sp_tg ON sp_tg.SanPhamID = sp.SanPhamID
               INNER JOIN tacgia tg ON tg.IDTacGia = sp_tg.IDTacGia
               WHERE anhsp.STT = 1
               `;

      if (startDate && endDate) sql += ` AND gh.NgayGiaoHang BETWEEN ? AND ?`;
      else sql += ` AND gh.NgayGiaoHang = ?`;

      sql += `
      AND gh.TinhTrangDon = 'Đã giao'
      GROUP BY sp.SanPhamID, anhsp.Anh
      ORDER BY DaBan DESC
      LIMIT 4
    `;

      const [product] = await db.query(
        sql,
        startDate && endDate ? [startDate, endDate] : [startDate]
      );

      return product;
    } catch (error) {
      console.error("Error fetching top products:", error);
      throw error;
    }
  }
}

export default Product;
