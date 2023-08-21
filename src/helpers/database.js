import mysql from "mysql2";
import { HttpStatusCode } from "../constants/httpStatusCode.js";
import { logger } from "./logger.js";

class DatabaseConnectionError extends Error {
    constructor(httpCode, message) {
        super(message);
        this.name = "DatabaseConnectionError";
        this.httpCode = httpCode;
    }
}

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
            throw new DatabaseConnectionError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Cannot connect to datbase");
        }
        else {
            console.log("Successfully connected to database");
            logger.info("Successfully connected to database");
        }

    } catch (error) {
        logger.error(err, "Error connecting to database or the connection may be closed");
    }
});

export { connection };