// TODO: nhớ cập nhật file này
/**@type {import('mysql2').PoolOptions} */
import dotenv from "dotenv";
dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};
console.log("MySQL Config:", {
  host: config.host,
  user: config.user,
  database: config.database,
});

export default config;
