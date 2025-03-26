const pool = require('../index');

class Category{
    async getAll(){
        const query = "SELECT * FROM danhmuc"; 
        const [rows] = await pool.query(query);
        return rows;
    }

    async search(id){
        const query = "SELECT * FROM danhmuc WHERE DanhMucID = ?"; 
        const [rows] = await pool.query(query, [id]);
        return rows;
    }

    async viewProduct(id){
        const query = 
        `SELECT danhmuc.DanhMucID, TenDanhMuc, sanpham.SanPhamID, TenSanPham, tacgia.TenTacGia, nxb.TenNXB, anhsp.Anh, Gia, SoLuongTon, SoTrang, MoTa
        FROM danhmuc 
        LEFT JOIN sp_dm ON sp_dm.DanhMucID = danhmuc.DanhMucID
        LEFT JOIN sanpham ON sanpham.SanPhamID = sp_dm.SanPhamID
        LEFT JOIN nxb ON sanpham.ID_NXB = nxb.ID_NXB
        LEFT JOIN sp_tg ON sanpham.SanPhamID = sp_tg.SanPhamID
        LEFT JOIN anhsp ON sanpham.SanPhamID = anhsp.ID_SP
        LEFT JOIN tacgia ON sp_tg.IDTacGia = tacgia.IDTacGia
        WHERE danhmuc.DanhMucID = ?`; 
        const [rows] = await pool.query(query, [id]);
        return rows;
    }

    async detailHeader(id){
        const query = "SELECT TenDanhMuc FROM danhmuc WHERE DanhMucID = ?"; 
        const [rows] = await pool.query(query, [id]);
        return rows;
    }

    async insert(id, name){
        const query = 
        `INSERT INTO danhmuc (DanhMucID, TenDanhMuc) VALUES
        (?, ?)`;
        const [rows] = await pool.query(query, [id, name]);
        return rows;
    }

    async delete(id){
        const query = "DELETE FROM danhmuc WHERE DanhMucID = ?";
        const [rows] = await pool.query(query, [id]);
        return rows;
    }
}

module.exports = new Category();