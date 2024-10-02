const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Caique230906@",
  database: "prisma",
});


const promisePool = pool.promise(); 

module.exports = promisePool;
