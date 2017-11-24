// Service that conects to the mysql database
// ====================================================================
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'app',
    password: 'NemoApp1234',
    database: 'nemo'
});

connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected ...");
    } else {
        console.log("Error connecting database ...\n" + err);
    }
});

const SCHEMA_NAME = 'nemo';
module.exports = [connection, SCHEMA_NAME];