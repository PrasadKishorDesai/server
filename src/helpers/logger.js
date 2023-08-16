const pino = require("pino");
const pinoHttp = require("pino-http");
const fs = require("fs");
const path = require("path");
const rootPath = require("./rootPath");

const levels = {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
};

const projRootPath = rootPath();
const loggerPath = path.join(projRootPath, "logs");
const todayDate = new Date().toJSON().slice(0,10);

fs.mkdir(loggerPath, { recursive: true }, (err) => {
    if (err) {
        throw err;
    }
});

const fileTransport = pino.transport({
    target: "pino/file",
    options: { destination: `${loggerPath}/${todayDate}.log` },
});

const logger = pino({
    level: "trace",
    timestamp: () => `,"time":"${new Date(new Date(Date.now()).toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))}"`,
    base: undefined,
    customLevels: levels,
    useOnlyCustomLevels: true,
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        }
    },
}, fileTransport);

const pinoHttpLogger = pinoHttp({
    logger: logger,
    serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res
    },
    wrapSerializers: true,
    customLogLevel: function (req, res, err) {
        if (res.statusCode >= 300) {
            return "error";
        }
        return "info";
    },

}, fileTransport);

module.exports = {
    logger,
    pinoHttpLogger
};
