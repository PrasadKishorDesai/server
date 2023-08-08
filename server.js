const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express();

const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./helpers/errorHandler');
const { successHandler } = require('./helpers/successHandler');

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
    successHandler(res, 200, "message from server");
});

app.use('/api', studentRoutes);

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    errorHandler(error, req, res);
    next();
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});

