import { HttpStatusCode } from "../constants/httpStatusCode.js";
import { logger } from "../helpers/logger.js";

class SchemaValidationError extends Error {
    constructor (httpCode, message) {
        super(message);
        this.name = "SchemaValidationError";
        this.httpCode = httpCode;
    }
}

export const validateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            const result = schema.validate(req.body);
            if (result.error) {
                logger.debug(result.error);
                logger.error(result.error, "validation failed");
                throw new SchemaValidationError(HttpStatusCode.BAD_INPUT, "Validation failed");
            }
        } catch (error) {
            next(error);
        }
        next();
    };
};
