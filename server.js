const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
    console.log()
    res.header("Content-Type", "application/json");
    res.status(200).send({message : "message from server"});
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

