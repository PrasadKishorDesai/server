var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'stud_db'
});

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database \n", err);
    }
    console.log("Successfully connected to database");
});

module.exports = connection;
