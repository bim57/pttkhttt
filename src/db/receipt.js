// const pool = require('../config/index');
import pool from '../config/index.js';

class Receipt{
    // Xem tất cả thông tin hóa đơn
    async getAll(){
        const query = 
        `SELECT hoadonnhap.IDHoaDonNhap, ncc.TenNCC, nhanvien.TenNhanVien, NgayNhap, TongTien, TinhTrangThanhToan
        FROM hoadonnhap 
        LEFT JOIN ncc ON hoadonnhap.ID_NCC = ncc.ID_NCC
        LEFT JOIN nhanvien ON hoadonnhap.IDNhanVien = nhanvien.IDNhanVien`;
        const [rows] = await pool.execute(query);
        return rows;
    }

    // search hóa đơn
    async search(id){
        const query = 
        `SELECT hoadonnhap.IDHoaDonNhap, ncc.TenNCC, nhanvien.TenNhanVien, NgayNhap, TongTien, TinhTrangThanhToan
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

    // lấy thông tin ncc
    async get_provider(){
        const query = 
        `SELECT CONCAT(ID_NCC, ' - ', TenNCC) AS provider_info FROM ncc`;
        const [rows] = await pool.execute(query);
        return rows;
    }

    // lấy thông tin nhân viên
    async get_employee(){
        const query = 
        `SELECT CONCAT(IDNhanVien, ' - ', TenNhanVien) AS employee_info FROM nhanvien`;
        const [rows] = await pool.execute(query);
        return rows;
    }

    // lấy thông tin nhân viên
    async get_product(){
        const query = 
        `SELECT SanPhamID, TenSanPham, CONCAT(SanPhamID, ' - ', TenSanPham) AS product_info FROM sanpham`;
        const [rows] = await pool.execute(query);
        return rows;
    }

    // thêm hóa đơn
    async insert(provider_id, employee_id, product_details, payment){
        // tạo hóa đơn mới
        let receipt_id;
        let [result] = await pool.execute(
            `INSERT INTO HoaDonNhap (ID_NCC, IDNhanVien, NgayNhap, TinhTrangThanhToan) 
            VALUES (?, ?, NOW(), ?)`, [provider_id, employee_id, payment]
        );
        receipt_id = result.insertId;

        // thêm sản phẩm vào hóa đơn
        for (const product of product_details){
            const {productName, quantity, price} = product;
            let product_id;
            let [row] = await pool.execute(
                `SELECT SanPhamID FROM sanpham WHERE TenSanPham = ?`, [productName]
            );
            product_id = row[0].SanPhamID;
            await pool.execute(
                `INSERT INTO chitiethoadonnhap (IDHoaDonNhap, IDSanPham, SoLuong, GiaNhap) 
                VALUES (?, ?, ?, ?)`, [receipt_id, product_id, quantity, price]
            );
            await pool.execute(
                `UPDATE sanpham
                SET SoLuongTon = SoLuongTon + ?
                WHERE SanPhamID = ?`, [quantity, product_id]
            );
        }
    }

    // lấy thông tin hóa đơn
    async get_receipt(id){
        const query = 
        `SELECT hoadonnhap.IDHoaDonNhap, CONCAT(ncc.ID_NCC, ' - ', ncc.TenNCC) AS provider_info, 
        CONCAT(nhanvien.IDNhanVien, ' - ', nhanvien.TenNhanVien) AS employee_info, TinhTrangThanhToan
        FROM hoadonnhap 
        LEFT JOIN ncc ON hoadonnhap.ID_NCC = ncc.ID_NCC
        LEFT JOIN nhanvien ON hoadonnhap.IDNhanVien = nhanvien.IDNhanVien
        WHERE hoadonnhap.IDHoaDonNhap = ?`;
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }

    // lấy thông tin sp trong hóa đơm
    async get_receipt_detail(id){
        const query = 
        `SELECT chitiethoadonnhap.IDSanPham, sanpham.TenSanPham, SoLuong, GiaNhap
        FROM chitiethoadonnhap
        LEFT JOIN sanpham ON chitiethoadonnhap.IDSanPham = sanpham.SanPhamID
        WHERE chitiethoadonnhap.IDHoaDonNhap = ?`;
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }

    // sửa hóa đơn
    async update(receipt_id, provider_id, employee_id, product_details, payment){
        // sửa thông tin hóa đơn
        await pool.execute(
            `UPDATE hoadonnhap
            SET ID_NCC = ?,
                IDNhanVien = ?,
                TinhTrangThanhToan = ?
            WHERE IDHoaDonNhap = ?`, [provider_id, employee_id, payment, receipt_id]
        );

        // lấy thông tin của số lượng tồn
        const [old_product_details] = await pool.execute(
            `SELECT IDSanPham, SoLuong
            FROM chitiethoadonnhap 
            WHERE IDHoaDonNhap = ?`, [receipt_id]
        );

        // cập nhật SL tồn
        for (const old_product of old_product_details){
            const product_id = old_product.IDSanPham;
            const quantity = old_product.SoLuong;
            await pool.execute(
                `UPDATE sanpham
                SET SoLuongTon = SoLuongTon - ?
                WHERE SanPhamID = ?`, [quantity, product_id]
            );
        }

        // xóa sp cũ
        await pool.execute(
            `DELETE FROM chitiethoadonnhap WHERE IDHoaDonNhap = ?`, [receipt_id]
        );

        // thêm sản phẩm vào hóa đơn
        for (const product of product_details){
            const {productName, quantity, price} = product;
            let product_id;
            let [row] = await pool.execute(
                `SELECT SanPhamID FROM sanpham WHERE TenSanPham = ?`, [productName]
            );
            product_id = row[0].SanPhamID;
            await pool.execute(
                `INSERT INTO chitiethoadonnhap (IDHoaDonNhap, IDSanPham, SoLuong, GiaNhap) 
                VALUES (?, ?, ?, ?)`, [receipt_id, product_id, quantity, price]
            );
            await pool.execute(
                `UPDATE sanpham
                SET SoLuongTon = SoLuongTon + ?
                WHERE SanPhamID = ?`, [quantity, product_id]
            );
        }
    }
}

// module.exports = new Receipt();
export default new Receipt();