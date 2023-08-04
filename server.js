const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express();

const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
    console.log()
    res.header("Content-Type", "application/json");
    res.status(200).send({message : "message from server"});
});

app.use('/api', studentRoutes);

app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 8000");
});

