export class StudentApiError extends Error {
    constructor (httpCode, message) {
        super(message);
        this.name = "StudentApiError";
        this.httpCode = httpCode;
    }
}
