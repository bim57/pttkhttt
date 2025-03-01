import mysql2 from "mysql2/promise";
import mysqlConfig from "../config/mysql.config.js";

const mysql = mysql2.createPool(mysqlConfig);

export default mysql;
