const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD, 
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
});

db.getConnection()
  .then(() => console.log("MySQL Connected Successfully"))
  .catch((err) => console.error("Database Connection Error:", err.message));

module.exports = db;
