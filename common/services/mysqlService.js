// Service that conects to the mysql database
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'app',
    password: 'NemoApp1234',
    database: 'nemo'
});

connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

const SCHEMA_NAME = 'nemo';
const USER_TABLE = 'users';

exports.register = function(req, res) {
    var today = new Date();
    bcrypt.hash(req.body.password, 5, function(err, bcryptedPassword) {

        var user = {
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "password": bcryptedPassword,
            "create_time": today,
            "modify_time": today
        }


        connection.query('INSERT INTO ' + SCHEMA_NAME + '.' + USER_TABLE + ' SET ?', user, function(error, results, fields) {
            if (error) {
                console.log("(register) error ocurred", error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred when registering user"
                })
            } else {
                console.log('(register) The solution is: ', results);
                res.send({
                    "code": 200,
                    "success": "user registered sucessfully"
                });
            }
        });
    });
}

exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM ' + SCHEMA_NAME + '.' + USER_TABLE + ' WHERE email = ?', [email], function(error, results, fields) {
        if (error) {
            console.log("(login) error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            console.log('(login) The solution is: ', results);
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password, function(err, doesMatch) {
                    if (doesMatch) {
                        res.send({
                            "code": 200,
                            "success": "login sucessfull"
                        });
                    } else {
                        res.send({
                            "code": 204,
                            "success": "Email and password does not match"
                        });
                    }
                });
            } else {
                res.send({
                    "code": 204,
                    "success": "Email does not exits"
                });
            }
        }
    });
}