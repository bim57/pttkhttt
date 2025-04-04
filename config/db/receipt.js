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

    // xem thông tin chi tiết hóa đơn
    async view(id){
        const query = 
        `SELECT hoadonnhap.NgayNhap, hoadonnhap.TongTien, hoadonnhap.TinhTrangThanhToan, ncc.ID_NCC, 
        ncc.TenNCC, ncc.SDT, ncc.Email, ncc.SoNhaDuong, ncc.QuanHuyen, ncc.TinhThanhPho, nhanvien.IDNhanVien, 
        nhanvien.TenNhanVien
        FROM chitiethoadonnhap 
        LEFT JOIN hoadonnhap ON chitiethoadonnhap.IDHoaDonNhap = hoadonnhap.IDHoaDonNhap
        LEFT JOIN ncc ON hoadonnhap.ID_NCC = ncc.ID_NCC
        LEFT JOIN nhanvien ON hoadonnhap.IDNhanVien = nhanvien.IDNhanVien
        WHERE chitiethoadonnhap.IDHoaDonNhap = ?`;
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }

    // xem sản phẩm trong chi tiết hóa đơn
    async view_product_in_receipt(id){
        const query = 
        `SELECT chitiethoadonnhap.IDSanPham, sanpham.TenSanPham, anhsp.Anh, tacgia.TenTacGia, GiaNhap, SoLuong, (GiaNhap * SoLuong) as ThanhTien
        FROM chitiethoadonnhap 
        LEFT JOIN hoadonnhap ON chitiethoadonnhap.IDHoaDonNhap = hoadonnhap.IDHoaDonNhap
        LEFT JOIN sanpham ON chitiethoadonnhap.IDSanPham = sanpham.SanPhamID
        LEFT JOIN anhsp ON sanpham.SanPhamID = anhsp.ID_SP AND anhsp.STT = 1
        LEFT JOIN sp_tg ON sanpham.SanPhamID = sp_tg.SanPhamID
        LEFT JOIN tacgia ON sp_tg.IDTacGia = tacgia.IDTacGia
        WHERE chitiethoadonnhap.IDHoaDonNhap = ?`;
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