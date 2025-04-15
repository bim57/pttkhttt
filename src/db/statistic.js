// const pool = require('../config/index');
import pool from '../config/index.js';

class Statistic {
    // Xem tất cả thông tin thống kê
    async getAll() {
        const query = 
        `SELECT hoadonnhap.IDHoaDonNhap, ncc.TenNCC, nhanvien.TenNhanVien, NgayNhap, TongTien, TinhTrangThanhToan
        FROM hoadonnhap 
        LEFT JOIN ncc ON hoadonnhap.ID_NCC = ncc.ID_NCC
        LEFT JOIN nhanvien ON hoadonnhap.IDNhanVien = nhanvien.IDNhanVien`;
        const [rows] = await pool.execute(query);
        return rows;
    }

    // Lấy hóa đơn theo thời gian
    async getReceiptsByDateRange(from, to) {
        const query = 
        `SELECT hoadonnhap.IDHoaDonNhap, ncc.TenNCC, nhanvien.TenNhanVien, NgayNhap, TongTien, TinhTrangThanhToan
        FROM hoadonnhap
        LEFT JOIN ncc ON hoadonnhap.ID_NCC = ncc.ID_NCC
        LEFT JOIN nhanvien ON hoadonnhap.IDNhanVien = nhanvien.IDNhanVien
        WHERE DATE(NgayNhap) BETWEEN ? AND ?
        ORDER BY NgayNhap`;
        const [rows] = await pool.execute(query, [from, to]);
        return rows;
    }
      
}

// module.exports = new Statistic();
export default new Statistic();