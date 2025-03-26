const pool = require('../index');

class Product{
    async getAll(){
        const query = 
        `SELECT sanpham.SanPhamID, TenSanPham, tacgia.TenTacGia, nxb.TenNXB, anhsp.Anh, MoTa, Gia, SoLuongTon, SoTrang
        FROM sanpham
        LEFT JOIN nxb ON sanpham.ID_NXB = nxb.ID_NXB
        LEFT JOIN sp_tg ON sanpham.SanPhamID = sp_tg.SanPhamID
        LEFT JOIN anhsp ON sanpham.SanPhamID = anhsp.ID_SP
        LEFT JOIN tacgia ON sp_tg.IDTacGia = tacgia.IDTacGia`; 
        const [rows] = await pool.query(query);
        return rows;
    }

    async search(id){
        const query = 
        `SELECT sanpham.SanPhamID, TenSanPham, tacgia.TenTacGia, nxb.TenNXB, anhsp.Anh, MoTa, Gia, SoLuongTon, SoTrang
        FROM sanpham
        LEFT JOIN nxb ON sanpham.ID_NXB = nxb.ID_NXB
        LEFT JOIN sp_tg ON sanpham.SanPhamID = sp_tg.SanPhamID
        LEFT JOIN anhsp ON sanpham.SanPhamID = anhsp.ID_SP
        LEFT JOIN tacgia ON sp_tg.IDTacGia = tacgia.IDTacGia
        WHERE sanpham.SanPhamID = ?`; 
        const [rows] = await pool.query(query, [id]);
        return rows;
    }

    async product_image(id){
        const query = "SELECT Anh FROM anhsp WHERE ID_SP = ?";
        const [rows] = await pool.query(query, [id]);
        return rows;
    }
}

module.exports = new Product();