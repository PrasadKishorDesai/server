const express = require('express')
const cors = require('cors')

const app = express();

const studentRoutes = require('./modules/studentRoutes');

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
    console.log()
    res.header("Content-Type", "application/json");
    res.status(200).send({message : "message from server"});
});

app.use('/api', studentRoutes);

app.use('/api/auth', require('./modules/auth/Login'));

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});


/*
tasks to do 11/07
api/auth/login
api/auth/signup
express validator


*/