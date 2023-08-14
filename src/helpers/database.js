var mysql = require("mysql2");
const logger = require("./logger").logger;

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
            err.statusCode = 500;
            logger.error(err, "Error connecting to database or the connection may be closed");
            throw err;
        }
        else  {
            console.log("Successfully connected to database");
            logger.info("Successfully connected to database");
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
});

module.exports = connection;
