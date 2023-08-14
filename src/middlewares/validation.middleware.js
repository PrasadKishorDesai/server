const { logger } = require("../helpers/logger");

const validateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            const result = schema.validate(req.body);
            if (result.error) {
                logger.debug(result.error);
                logger.error(err, "validation failed");
                var err = await new Error("validation failed");
                err.statusCode = 400;
                err.data = [];
                throw err;
            }
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
        next();
    };
};

module.exports = validateSchema;