var mysql = require("mysql2");
const HttpStatusCode = require("../constants/httpStatusCode");
const logger = require("./logger").logger;

class DatabaseConnectionError extends Error {
    constructor(httpCode, message) {
        super(message);
        this.name = "DatabaseConnectionError";
        this.httpCode = httpCode;
    }
};

var connection = mysql.createConnection({
    host: process.env.MYSQLDB_HOST,
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    timezone: "Z",
    // connectTimeout: 30000,
    port: process.env.MYSQLDB_LOCAL_PORT
});

const connectToDatabase = () => {
    connection.connect((err) => {
        try {
            if (err) {
                logger.error(err, "Error connecting to database or the connection may be closed");
                throw new DatabaseConnectionError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Cannot connect to datbase");
            }
            else {
                console.log("Successfully connected to database");
                logger.info("Successfully connected to database");
            }

        } catch (error) {

        }
    });
}

try {
    connectToDatabase();
} catch (error) {
    throw new DatabaseConnectionError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Cannot connect to datbase");
}

module.exports = connection;