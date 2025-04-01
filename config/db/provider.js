// const pool = require('../index');
import pool from '../index.js';

class Provider{
    // Xem tất cả thông tin ncc
    async getAll(){
        const query = "SELECT * FROM ncc";
        const [rows] = await pool.execute(query);
        return rows;
    }

    // search ncc
    async search(id){
        const query = "SELECT * FROM ncc where ID_NCC = ?";
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }

    // thêm ncc mới
    async insert(name, phone, email, street, district, city){
        const query = 
        `INSERT INTO ncc (TenNCC, SDT, Email, QuanHuyen, SoNhaDuong, TinhThanhPho) VALUES
        (?, ?, ?, ?, ?, ?)`;
        const [rows] = await pool.execute(query, [name, phone, email, district, street, city]);
        return rows;
    }

    // sửa thông tin ncc
    async update(id, name, phone, email, street, district, city){
        const query = 
        `UPDATE ncc  
        SET TenNCC = ?,  
            SDT = ?,  
            Email = ?,  
            QuanHuyen = ?,
            SoNhaDuong = ?,
            TinhThanhPho = ?
        WHERE ID_NCC = ?`;
        const [rows] = await pool.execute(query, [name, phone, email, district, street, city, id]);
        return rows;
    }

    // xoá ncc
    async delete(id){
        const query = "DELETE FROM ncc WHERE ID_NCC = ?";
        const [rows] = await pool.execute(query, [id]);
        return rows;
    }
}

// module.exports = new Provider();
export default new Provider();