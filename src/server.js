const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express();

const studentRoutes = require('../routes/studentRoutes');
const authRoutes = require('../routes/authRoutes');
const { errorHandler } = require('../helpers/errorHandler');
const { successHandler } = require('../helpers/successHandler');
const { logger, pinoHttpLogger } = require('./helpers/logger');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pinoHttpLogger)

app.use((error, req, res, next) => {
    errorHandler(error, req, res);
    next();
});

app.get("/message", (req, res, next) => {
    successHandler(res, 200, "message from server");
    next();
});

app.use('/api', studentRoutes);

app.use('/auth', authRoutes);


app.listen(process.env.NODE_DOCKER_PORT, () => {
    logger.info(`Server is running on port ${process.env.NODE_DOCKER_PORT}`);
    console.log("Server is running on port", process.env.NODE_DOCKER_PORT);
});

// process.on('uncaughtException', (err) => {
//     logger.fatal(err, 'uncaught exception detected');
// });
// process.on('SIGTERM', signal => {
//     console.log(`Process ${process.pid} received a SIGTERM signal`)
//     process.exit(0)
// })

// process.on('SIGINT', signal => {
//     console.log(`Process ${process.pid} has been interrupted`)
//     process.exit(0)
// })
// process.on('unhandledRejection', (reason, promise) => {
//     console.log('Unhandled rejection at ', promise, `reason: ${err.message}`)
//     process.exit(1)
// })
