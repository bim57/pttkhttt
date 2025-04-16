// const mysql = require('mysql2');
// const dotenv = require('dotenv');
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// cài đặt kết nối mysql 
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// module.exports = pool.promise();
export default pool.promise();