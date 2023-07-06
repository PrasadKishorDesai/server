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

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

