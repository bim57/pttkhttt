const pool = require('../index');

class Product{
    async getAll(){
        const query = 
        `SELECT sanpham.SanPhamID, TenSanPham, tacgia.TenTacGia, nxb.TenNXB, anhsp.Anh, MoTa, Gia, SoLuongTon, SoTrang
        FROM sanpham
        LEFT JOIN nxb ON sanpham.ID_NXB = nxb.ID_NXB
        LEFT JOIN sp_tg ON sanpham.SanPhamID = sp_tg.SanPhamID
        LEFT JOIN anhsp ON sanpham.SanPhamID = anhsp.ID_SP AND anhsp.STT = 1
        LEFT JOIN tacgia ON sp_tg.IDTacGia = tacgia.IDTacGia`;
        const [rows] = await pool.query(query);
        return rows;
    }

    async search(id){
        const query = 
        `SELECT sanpham.SanPhamID, TenSanPham, tacgia.TenTacGia, nxb.TenNXB, MoTa, Gia, SoLuongTon, SoTrang
        FROM sanpham
        LEFT JOIN nxb ON sanpham.ID_NXB = nxb.ID_NXB
        LEFT JOIN sp_tg ON sanpham.SanPhamID = sp_tg.SanPhamID
        LEFT JOIN tacgia ON sp_tg.IDTacGia = tacgia.IDTacGia
        WHERE sanpham.SanPhamID = ?`; 
        const [rows] = await pool.query(query, [id]);
        return rows;
    }
    
    async getCategory(id){
        const query = 
        `SELECT danhmuc.TenDanhMuc
        FROM sp_dm 
        LEFT JOIN sanpham ON sanpham.SanPhamID = sp_dm.SanPhamID
        LEFT JOIN danhmuc ON danhmuc.DanhMucID = sp_dm.DanhMucID
        where sanpham.SanPhamID = ?`; 
        const [rows] = await pool.query(query, [id]);
        return rows;
    }

    async getImage(id){
        const query = 
        `SELECT Anh
        FROM anhsp
        LEFT JOIN sanpham ON sanpham.SanPhamID = anhsp.ID_SP
        where sanpham.SanPhamID = ?;`; 
        const [rows] = await pool.query(query, [id]);
        return rows;
    }

    async insert(){
        const query = 
        ``;
        const [rows] = await pool.query(query);
        return rows;
    }
}

module.exports = new Product();