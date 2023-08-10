var mysql = require('mysql2');
var connection = mysql.createConnection({
  host: process.env.MYSQLDB_HOST,
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  timezone: "Z",
  // connectTimeout: 30000,
  port: process.env.MYSQLDB_LOCAL_PORT
});

connection.connect((err) => {
  try {
    if (err) {
      console.log("Error connecting to database \n", err);
      err.statusCode = 500;
      throw err;
    }
    else
      console.log("Successfully connected to database");

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
  }
});

module.exports = connection;
