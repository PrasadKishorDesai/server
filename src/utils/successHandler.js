import { HttpStatusCode } from "../constants/httpStatusCode.js";

export const successHandler = (res, statusCode = HttpStatusCode.OK, message = "success", data = []) => {
    res.setHeader("Content-type", "application/json");
    res.status(statusCode).send({
        success: true,
        message,
        data
    });
};