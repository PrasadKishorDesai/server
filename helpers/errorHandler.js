const logger = require("../src/helpers/logger");

exports.errorHandler = (error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    const data = error.data || [];
    logger.error(error, "Something went wrong!!");
    res.setHeader("Content-Type", "application/json");
    res.status(status).send({
        success: false,
        message: message,
        data: data
    })
}
