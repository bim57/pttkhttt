// const pool = require('../config/index');
import pool from '../config/index.js';

function normalizeString(str) {
    return str
        .normalize("NFD") // Chuyển ký tự có dấu thành dạng tổ hợp (VD: é → e + ´)
        .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
        .toLowerCase() // Chuyển về chữ thường
        .trim(); // Xóa khoảng trắng đầu & cuối
}

class Product{
    // Xem tất cả sản phẩm
    async getAll(){
        const query = 
        `SELECT sanpham.SanPhamID, TenSanPham, tacgia.TenTacGia, nxb.TenNXB, anhsp.Anh, MoTa, Gia, SoLuongTon, SoTrang
        FROM sanpham
        LEFT JOIN nxb ON sanpham.ID_NXB = nxb.ID_NXB
        LEFT JOIN sp_tg ON sanpham.SanPhamID = sp_tg.SanPhamID
        LEFT JOIN anhsp ON sanpham.SanPhamID = anhsp.ID_SP AND anhsp.STT = 1
        LEFT JOIN tacgia ON sp_tg.IDTacGia = tacgia.IDTacGia
        WHERE sanpham.tinhTrang = 1`;
        const [rows] = await pool.execute(query);
        return rows;
    }

    // search sản phẩm
    async search(id){
        const query = 
        `SELECT sanpham.SanPhamID, TenSanPham, tacgia.TenTacGia, nxb.TenNXB, anhsp.Anh, MoTa, Gia, SoLuongTon, SoTrang
        FROM sanpham
        LEFT JOIN nxb ON sanpham.ID_NXB = nxb.ID_NXB
        LEFT JOIN sp_tg ON sanpham.SanPhamID = sp_tg.SanPhamID
        LEFT JOIN anhsp ON sanpham.SanPhamID = anhsp.ID_SP AND anhsp.STT = 1
        LEFT JOIN tacgia ON sp_tg.IDTacGia = tacgia.IDTacGia
        WHERE sanpham.SanPhamID = ?
        AND sanpham.tinhTrang = 1`; 
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }
    
    // Hiển thị các danh mục của sản phẩm trong chi tiết sp (theo tên)
    async getCategory_by_name(id){
        const query = 
        `SELECT danhmuc.TenDanhMuc
        FROM sp_dm
        LEFT JOIN sanpham ON sanpham.SanPhamID = sp_dm.SanPhamID
        LEFT JOIN danhmuc ON danhmuc.DanhMucID = sp_dm.DanhMucID
        where sanpham.SanPhamID = ?
        AND danhmuc.tinhTrang = 1`;
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }

    // Hiển thị các danh mục của sản phẩm trong chi tiết sp (theo id)
    async getCategory_by_id(id){
        const query = 
        `SELECT danhmuc.DanhMucID
        FROM sp_dm 
        LEFT JOIN sanpham ON sanpham.SanPhamID = sp_dm.SanPhamID
        LEFT JOIN danhmuc ON danhmuc.DanhMucID = sp_dm.DanhMucID
        where sanpham.SanPhamID = ?
        AND danhmuc.tinhTrang = 1`; 
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }

    // Hiển thị hình ảnh của sp trong chi tiết sp
    async getImage(id){
        const query = 
        `SELECT Anh
        FROM anhsp
        LEFT JOIN sanpham ON sanpham.SanPhamID = anhsp.ID_SP
        where sanpham.SanPhamID = ?;`; 
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }

    // Xác định hình ảnh base64
    async getImageBase64(id) {
        const query = 
        `SELECT Anh
        FROM anhsp
        LEFT JOIN sanpham ON sanpham.SanPhamID = anhsp.ID_SP
        where sanpham.SanPhamID = ?;`; 
        const [rows] = await pool.execute(query, [id]);
        // kết quả là chuỗi String nên phải chuyển về base64

        if (!rows || rows.length === 0) {
            console.error("Không tìm thấy ảnh");
            return [];
        }
    
         // Duyệt qua tất cả ảnh, chuyển đổi về base64 chuẩn
        const base64Images = rows.map(row => {
            let base64String = row.Anh.toString(); // Chuyển Buffer hoặc string thành chuỗi

            let format = "jpeg"; // Mặc định là JPEG nếu không tìm thấy

            // Kiểm tra xem chuỗi có tiền tố "data:image/...;base64,"
            const matches = base64String.match(/^data:image\/([a-zA-Z]+);base64,/);
            if (matches) {
                format = matches[1]; // Lấy định dạng từ tiền tố
                base64String = base64String.replace(matches[0], ""); // Xóa phần tiền tố để lấy base64 thuần
            }

            // Trả về base64 đã chuẩn hóa với định dạng chính xác
            return `data:image/${format};base64,${base64String}`;
        });
    
        return base64Images;
    }
    

    // Thêm sản phẩm mới
    async insert(name, author, publisher, category, price, inventory, pages, description, imageBase64){
        // Chuẩn hóa tác giả và nhà xuất bản
        const normalizedAuthor = normalizeString(author);
        const normalizedPublisher = normalizeString(publisher);

        // Kiểm tra Tác giả xem có trùng không
        let [rows] = await pool.execute(
            `SELECT IDTacGia FROM tacgia WHERE LOWER(TenTacGia) = LOWER(?)`, [normalizedAuthor]
        );

        let authorId;
        if (rows.length > 0) {
            authorId = rows[0].IDTacGia; // nếu trùng thì lấy id tác giả
        } else {
            // không thì thêm tác giả mới
            let [result] = await pool.execute(
                `INSERT INTO tacgia (TenTacGia) VALUES (?)`, [author]
            );
            authorId = result.insertId; // lấy ID của dòng vừa được thêm
        }

        // Kiểm tra Nhà Xuất Bản
        [rows] = await pool.execute(
            `SELECT ID_NXB FROM NXB WHERE LOWER(TenNXB) = LOWER(?)`, [normalizedPublisher]
        );
    
        let publisherId;
        if (rows.length > 0) {
            publisherId = rows[0].ID_NXB;
        } else {
            let [result] = await pool.execute(
            `INSERT INTO NXB (TenNXB) VALUES (?)`, [publisher]
            );
            publisherId = result.insertId;
        }

        // Thêm sp vào bảng sanpham
        let [result] =  await pool.execute(
            `INSERT INTO sanpham (TenSanPham, ID_NXB, MoTa, Gia, SoLuongTon, SoTrang) VALUES
            (?, ?, ?, ?, ?, ?)`, [name, publisherId, description, price, inventory, pages]
        );

        const id = result.insertId;

        // Thêm thông tin vào bảng sp_tg
        await pool.execute(
            `INSERT INTO sp_tg (SanPhamID, IDTacGia) VALUES (?, ?)`, [id, authorId]
        );

        // Thêm danh mục
        for (let cateID of category) {
            await pool.execute(
                `INSERT INTO sp_dm (SanPhamID, DanhMucID) VALUES (?, ?)`, [id, cateID]
            );
        }

        // Lưu ảnh vào database
        for (let image of imageBase64) {
            // Lấy STT lớn nhất của sản phẩm hiện có
            const [rows] = await pool.execute(
                "SELECT MAX(STT) AS maxSTT FROM anhsp WHERE ID_SP = ?", [id]
            );
            
            let newSTT = rows[0].maxSTT ? rows[0].maxSTT + 1 : 1;

            // Chèn ảnh vào bảng
            await pool.execute(
                "INSERT INTO anhsp (ID_SP, STT, Anh) VALUES (?, ?, ?)", [id, newSTT, image]
            );
        }
    }

    // Sửa thông tin sp
    async update(id, name, author, publisher, category, price, inventory, pages, description, imageBase64){
        const normalizedAuthor = normalizeString(author);
        const normalizedPublisher = normalizeString(publisher);

        // Kiểm tra Tác giả xem có trùng không
        let [rows] = await pool.execute(
            `SELECT IDTacGia FROM tacgia WHERE LOWER(TenTacGia) = LOWER(?)`, [normalizedAuthor]
        );

        let authorId;
        if (rows.length > 0) {
            authorId = rows[0].IDTacGia; // nếu trùng thì lấy id tác giả
        } else {
            // không thì thêm tác giả mới
            let [result] = await pool.execute(
                `INSERT INTO tacgia (TenTacGia) VALUES (?)`, [author]
            );
            authorId = result.insertId; // lấy ID của dòng vừa được thêm
        }

        // Kiểm tra Nhà Xuất Bản
        [rows] = await pool.execute(
            `SELECT ID_NXB FROM NXB WHERE LOWER(TenNXB) = LOWER(?)`, [normalizedPublisher]
        );
    
        let publisherId;
        if (rows.length > 0) {
            publisherId = rows[0].ID_NXB;
        } else {
            let [result] = await pool.execute(
            `INSERT INTO NXB (TenNXB) VALUES (?)`, [publisher]
            );
            publisherId = result.insertId;
        }

        // Sửa thông tin sp
        await pool.execute(
            `UPDATE sanpham
            SET TenSanPham = ?,  
                ID_NXB = ?,  
                MoTa = ?,  
                Gia = ?,
                SoLuongTon = ?,
                SoTrang = ?
            WHERE SanPhamID = ?`, [name, publisherId, description, price, inventory, pages, id]
        );

        // Sửa thông tin bảng sp_tg
        await pool.execute(
            `UPDATE sp_tg
            SET IDTacGia = ?
            WHERE SanPhamID = ?`, [authorId, id]
        );

        // Xóa dm đã có trong sp
        await pool.execute(
            `DELETE FROM sp_dm WHERE SanPhamID = ?`, [id]
        );

        // Thêm danh mục mới của sp
        for (let cateID of category) {
            await pool.execute(
                `INSERT INTO sp_dm (SanPhamID, DanhMucID) VALUES (?, ?)`, [id, cateID]
            );
        }

        // Xóa ảnh cũ của sp
        await pool.execute(
            `DELETE FROM anhsp WHERE ID_SP = ?`, [id]
        );

        // Lưu ảnh vào database
        for (let image of imageBase64) {
            // Lấy STT lớn nhất của sản phẩm hiện có
            const [rows] = await pool.execute(
                "SELECT MAX(STT) AS maxSTT FROM anhsp WHERE ID_SP = ?", [id]
            );
            
            let newSTT = rows[0].maxSTT ? rows[0].maxSTT + 1 : 1;

            // Chèn ảnh vào bảng
            await pool.execute(
                "INSERT INTO anhsp (ID_SP, STT, Anh) VALUES (?, ?, ?)", [id, newSTT, image]
            );
        }
    }

    // Xóa sp
    async delete(id){
        // Xóa sản phẩm
        await pool.execute(
            `UPDATE sanpham
            SET tinhTrang = 0
            WHERE SanPhamID = ?`, [id]
        );
    }
}

// module.exports = new Product();
export default new Product();