class AdminApiError extends Error {
    constructor (httpCode, message) {
        super(message);
        this.name = "AdminApiError";
        this.httpCode = httpCode;
    }
}

module.exports = AdminApiError;