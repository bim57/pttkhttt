// const pool = require('../index');
import pool from '../index.js';

class Category {
    // Xem tất cả danh mục
    async getAll() {
        const query = "SELECT * FROM danhmuc";
        const [rows] = await pool.execute(query);
        return rows;
    }

    // search danh mục
    async search(id) {
        const query = "SELECT * FROM danhmuc WHERE DanhMucID = ?";
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }

    // Xem các sản phẩm có trong danh mục
    async viewProduct(id){
        const query = 
        `SELECT danhmuc.DanhMucID, TenDanhMuc, sanpham.SanPhamID, TenSanPham, tacgia.TenTacGia, nxb.TenNXB, anhsp.Anh, Gia, SoLuongTon, SoTrang, MoTa
        FROM danhmuc 
        LEFT JOIN sp_dm ON sp_dm.DanhMucID = danhmuc.DanhMucID
        LEFT JOIN sanpham ON sanpham.SanPhamID = sp_dm.SanPhamID
        LEFT JOIN nxb ON sanpham.ID_NXB = nxb.ID_NXB
        LEFT JOIN sp_tg ON sanpham.SanPhamID = sp_tg.SanPhamID
        LEFT JOIN anhsp ON sanpham.SanPhamID = anhsp.ID_SP AND anhsp.STT = 1
        LEFT JOIN tacgia ON sp_tg.IDTacGia = tacgia.IDTacGia
        WHERE danhmuc.DanhMucID = ?`; 
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }

    // Hiển thị header của danh mục trong chi tiết danh mục
    async detailHeader(id) {
        const query = "SELECT TenDanhMuc FROM danhmuc WHERE DanhMucID = ?";
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }

    // Thêm một danh mục mới
    async insert(name){
        const query = 
        `INSERT INTO danhmuc (TenDanhMuc) VALUES (?)`;
        const [rows] = await pool.execute(query, [name]);
        return rows;
    }

    // sửa danh mục
    async update(id, name){
        const query = 
        `UPDATE danhmuc  
        SET TenDanhMuc = ?
        WHERE DanhMucID = ?;`;
        const [rows] = await pool.execute(query, [name, id]);
        return rows;
    }

    // xoá danh mục 
    async delete(id){
        const query = "DELETE FROM danhmuc WHERE DanhMucID = ?";
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }
}

// module.exports = new Category();
export default new Category();