import express from "express";
import cors from "cors";
import "dotenv/config";

import studentRoutes from "./api/v1.0/modules/student/routes.js";
import authRoutes from "./api/v1.0/modules/admin/routes.js";
import { successHandler } from "./utils/successHandler.js";
import { logger, pinoHttpLogger } from "./helpers/logger.js";
import {errorMiddleware} from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pinoHttpLogger);

app.get("/message", (req, res, next) => {
    successHandler(res, 200, "message from server");
    next();
});

app.use("/api", studentRoutes);

app.use("/auth", authRoutes);


app.listen(process.env.NODE_DOCKER_PORT, () => {
    logger.info(`Server is running on port ${process.env.NODE_DOCKER_PORT}`);
    console.log("Server is running on port", process.env.NODE_DOCKER_PORT);
});

app.use((error, req, res, next) => {
    errorMiddleware(error, req, res);
    next();
});

process.on("uncaughtException", (err) => {
    logger.fatal(err, "uncaught exception detected");
});

process.on("SIGTERM", () => {
    console.log(`Process ${process.pid} received a SIGTERM signal`);
    process.exit(0);
});

process.on("SIGINT", () => {
    console.log(`Process ${process.pid} has been interrupted`);
    process.exit(0);
});

process.on("unhandledRejection", (err, promise) => {
    console.log("Unhandled rejection at ", promise, `reason: ${err.message}`);
    process.exit(1);
});
