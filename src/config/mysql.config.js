// TODO: nhớ cập nhật file này
/**@type {import('mysql2').PoolOptions} */
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

export default config;
