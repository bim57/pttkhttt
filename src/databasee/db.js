/*import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cua_hang_sach',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool; */

import mysql from 'mysql2';
import dotenv from 'dotenv';

// Nạp các biến môi trường từ file .env
dotenv.config();

// Tạo kết nối MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'cua_hang_sach',
  //waitForConnections: true,
  //connectionLimit: 10,
  //queueLimit: 0
});

export default pool.promise();

