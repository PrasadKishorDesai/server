const HttpStatusCode = require("../constants/httpStatusCode");
const { logger } = require("../helpers/logger");

const errorMiddleware = (error, req, res) => {
    const status = error.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal Server Error";
    logger.error(error, "Something went wrong!!");
    res.setHeader("Content-Type", "application/json");
    res.status(status).send({
        success: false,
        message: message
    })
};

module.exports = errorMiddleware;