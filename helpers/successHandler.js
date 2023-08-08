exports.successHandler = (res, statusCode=200, message="success", data=[]) => {
    res.setHeader("Content-type", "application/json");
    res.status(statusCode).send({
        success: true,
        message,
        data
    })
};
