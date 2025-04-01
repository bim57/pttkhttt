// const mysql = require('mysql2');
import mysql from 'mysql2';

// cài đặt kết nối mysql 
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mysql1009",
    database: "cua_hang_sach",
});

// module.exports = pool.promise();
export default pool.promise();