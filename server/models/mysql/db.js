const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "prof@etec",
  database: "prisma",
});


const promisePool = pool.promise(); 

module.exports = promisePool;
