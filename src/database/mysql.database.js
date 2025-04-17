import mysql2 from "mysql2/promise";
import mysqlConfig from "../config/mysql.config.js";

const mysql = mysql2.createPool(mysqlConfig);

console.log("MySQL Config:", {
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  database: mysqlConfig.database,
});

export default mysql;
