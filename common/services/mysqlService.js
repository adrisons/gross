// Service that conects to the mysql database
// ====================================================================
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var User = require('../../model/user');

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
const USER_TABLE = 'users';

// ====================================================================
// PUBLIC FUNCTIONS
// ====================================================================

// Register. Public function for register users
// Returns:
//   200 - user exist -> 403
//   400 - generic error
//   401 - user exist -> 403
//   403 - user doesnt exist -> register
exports.register = function(req, res) {
    // Check if the user already exists
    authenticate(req, res)
        .then(function() {
            res.send({
                "code": 403,
                "message": "user already exists"
            });
        })
        .catch(function(errorCode) {
            switch (errorCode) {
                case 401:
                    res.send({
                        "code": 403,
                        "message": "user already exists"
                    });
                    break;
                case 403:
                    register(req, res);
                    break;
                default:
                    res.send({
                        "code": 400,
                        "message": "error ocurred checking user existence"
                    });
            }
        });
};

// Login. Public function for login users
// Returns:
//   200 - login sucessfull
//   400 - generic error
//   401 - password is not correct
//   403 - email does not exist
exports.login = function(req, res) {
    authenticate(req, res)
        .then(function(userData) {
            res.send({
                "code": 200,
                "message": "login sucessfull",
                "data": User.newObject(userData)
            });
        })
        .catch(function(errorCode) {
            switch (errorCode) {
                case 401:
                    res.send({
                        "code": 401,
                        "message": "password is not correct"
                    });
                    break;
                case 403:
                    res.send({
                        "code": 403,
                        "message": "email does not exist"
                    });
                    break;
                default:
                    res.send({
                        "code": 400,
                        "message": "error ocurred"
                    })
            }
        });
};

// ====================================================================
// PRIVATE FUNCTIONS
// ====================================================================

// Register user
// Returns:
//   200 - register sucessfull
//   400 - generic error
var register = function(req, res) {
    bcrypt.hash(req.body.password, 5, function(err, bcryptedPassword) {
        var today = new Date();
        var newUser = User.newObject(req.body.first_name.trim(), req.body.last_name.trim(), req.body.email.trim(), today, today, bcryptedPassword);

        connection.query('INSERT INTO ' + SCHEMA_NAME + '.' + USER_TABLE + ' SET ?', newUser, function(error, results, fields) {
            if (error) {
                console.log("(register) error ocurred", error);
                res.send({
                    "code": 400,
                    "message": "error ocurred registering user"
                })
            } else {
                console.log('(register) The solution is: ', results);
                res.send({
                    "code": 200,
                    "message": "user registered sucessfully",
                    "data": newUser
                });
            }
        });
    });
};

// Authenticate
// Checks if user exists and password is correct
// Returns:
//   200 - login sucessfull - return user data
//   400 - generic error
//   401 - password is not correct
//   403 - email does not exist
var authenticate = function(req, res) {
    var email = req.body.email.trim();
    var password = req.body.password;
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM ' + SCHEMA_NAME + '.' + USER_TABLE + ' WHERE email = ?', [email], function(error, results, fields) {
            if (error) {
                console.log("(login) error ocurred", error);
                reject(400);
            } else {
                console.log('(login) The solution is: ', results);
                if (results.length > 0) {
                    if (results.length > 1) {
                        console.log('(login) Multiple users for same email: ', results);
                    }
                    bcrypt.compare(password, results[0].password, function(err, doesMatch) {
                        if (doesMatch) {
                            resolve(results[0]);
                        } else {
                            reject(401);
                        }
                    });
                } else {
                    reject(403);
                }
            }
        });
    });
};