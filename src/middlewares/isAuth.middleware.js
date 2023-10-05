import jwt from "jsonwebtoken";
import { HttpStatusCode } from "../constants/httpStatusCode.js";

class AuthenticationError extends Error {
    constructor (httpCode, message) {
        super(message);
        this.name = "AuthenticationError";
        this.httpCode = httpCode;
    }
}

export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            throw new AuthenticationError(HttpStatusCode.NOT_AUTHORIZED, "Not authenticated");
        }
        const token = authHeader.split(" ")[1];
        let decoded = await jwt.verify(token, "mySuperSecretKey");

        if (!decoded) {
            throw new AuthenticationError(HttpStatusCode.NOT_AUTHORIZED, "Invalid token");
        }

        req.userId = decoded.user_id;

    } catch (error) {
        next(error);
    }
    next();
};
