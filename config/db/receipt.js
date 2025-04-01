// const pool = require('../index');
import pool from '../index.js';

class Receipt{
    // Xem tất cả thông tin hóa đơn
    async getAll(){
        const query = 
        `SELECT hoadonnhap.IDHoaDonNhap, ncc.TenNCC, nhanvien.TenNhanVien, NgayNhap, TongTien
        FROM hoadonnhap 
        LEFT JOIN ncc ON hoadonnhap.ID_NCC = ncc.ID_NCC
        LEFT JOIN nhanvien ON hoadonnhap.IDNhanVien = nhanvien.IDNhanVien`;
        const [rows] = await pool.execute(query);
        return rows;
    }

    // search hóa đơn
    async search(id){
        const query = 
        `SELECT hoadonnhap.IDHoaDonNhap, ncc.TenNCC, nhanvien.TenNhanVien, NgayNhap, TongTien
        FROM hoadonnhap 
        LEFT JOIN ncc ON hoadonnhap.ID_NCC = ncc.ID_NCC
        LEFT JOIN nhanvien ON hoadonnhap.IDNhanVien = nhanvien.IDNhanVien
        WHERE hoadonnhap.IDHoaDonNhap = ?`;
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }

    // thêm hóa đơn
    // async insert(){
       
    // }

    // sửa hóa đơn
    // async update(){
        
    // }

    // xoá hóa đơn
    // async delete(){
        
    // }
}

// module.exports = new Receipt();
export default new Receipt();