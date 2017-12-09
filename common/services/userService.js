// Service that conects to the mysql database for user actions
// ====================================================================

var bcrypt = require('bcrypt');
var User = require('../../model/user');
var jwt = require('jsonwebtoken');
var [connection, SCHEMA_NAME] = require('../../common/services/mysqlService');
var config = require('../../model/constants').config;
const TABLE = 'users';

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
    authenticate(req)
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
                    register(req, res)
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
//   200 - login successfull
//   400 - generic error
//   401 - password is not correct
//   403 - email does not exist
var login = function(req, res) {
    authenticate(req)
        .then(function(user) {
            user.token = jwt.sign({ id: user.id }, config.secret);
            user.social = [];
            console.log('(login) return: ', user);
            res.send({
                "code": 200,
                "message": "login successfull",
                "data": user
            });

        })
        .catch(function(errorCode) { processAuthErrorCode(res, errorCode); });
};

exports.login = login;

// Login. Public function for login users
// Returns:
//   200 - login successfull
//   400 - generic error
//   401 - password is not correct
//   403 - email does not exist
exports.update = function(req, res) {
    authenticate(req)
        .then(function(user) {
            updateUser(user, req, res);
        })
        .catch(function(errorCode) { processAuthErrorCode(res, errorCode); });
};

// ====================================================================
// PRIVATE FUNCTIONS
// ====================================================================

// Register user
// Returns:
//   200 - register successfull
//   400 - generic error
var register = function(req, res) {
    bcrypt.hash(req.body.password, 5, function(err, bcryptedPassword) {
        var today = new Date();
        var newUser = User.newUser(null, req.body.first_name.trim(), req.body.last_name.trim(), req.body.email.trim(), today, today, bcryptedPassword);

        connection.query('INSERT INTO ' + SCHEMA_NAME + '.' + TABLE + ' SET ?', newUser, function(error, results, fields) {
            if (error) {
                console.log("(register) error ocurred", error);

                res.send({
                    "code": 400,
                    "message": "error ocurred registering user"
                });

            } else {
                console.log('(register) The solution is: ', results);

                console.log("user registered successfully");
                login(req, res);

            }
        });

    });
};

// Authenticate
// Checks if user exists and password is correct
// Returns:
//   200 - auth successfull - return user data
//   400 - generic error
//   401 - password is not correct
//   403 - email does not exist
var authenticate = function(req) {
    var query = 'SELECT * FROM ' + SCHEMA_NAME + '.' + TABLE + ' WHERE ';
    var params = [];
    if (req.body.id) {
        query += ' id = ?';
        params.push(req.body.id);
    } else if (req.body.email) {
        query += ' email = ?';
        params.push(req.body.email.trim());
    }

    return new Promise(function(resolve, reject) {
        connection.query(query, params, function(error, results, fields) {
            if (error) {
                console.log("(auth) error ocurred", error);
                reject(400);
            } else {
                console.log('(auth) The solution is: ', results);
                if (results.length > 0) {
                    if (results.length > 1) {
                        console.log('(auth) Multiple users for same email: ', results);
                    }
                    bcrypt.compare(req.body.password, results[0].password, function(err, doesMatch) {
                        if (doesMatch) {
                            resolve(User.toUser(results[0]));
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

var getUserUpdateQuery = function(oldUser, newUser) {
    var today = new Date();
    var query = "UPDATE " + SCHEMA_NAME + "." + TABLE + " SET";
    var is_first = true;
    if (!oldUser.id) {
        return '';
    }
    if (newUser.first_name) {
        if (!is_first) {
            query += ',';
        }
        is_first = false;
        query += " first_name='" + newUser.first_name.trim() + "'";
    }
    if (newUser.last_name) {
        if (!is_first) {
            query += ',';
        }
        is_first = false;
        query += " last_name='" + newUser.last_name.trim() + "'";
    }
    if (newUser.email) {
        if (!is_first) {
            query += ',';
        }
        is_first = false;
        query += " email='" + newUser.email.trim() + "'";
    }
    // query += " update_time=" + user.update_time;

    query += " WHERE id=" + oldUser.id;

    return query;

};

// Update user
// Returns:
//   200 - Update successfull
//   400 - generic error
var updateUser = function(user, req, res) {
    var query = getUserUpdateQuery(user, req.body);
    if (!query) {
        res.send({
            "code": 400,
            "message": "error ocurred updating user"
        })
    }
    connection.query(query, function(error, results, fields) {
        if (error) {
            console.log("(update) error ocurred", error);
            res.send({
                "code": 400,
                "message": "error ocurred updating user"
            })
        } else {
            console.log('(update) The solution is: ', results);
            res.send({
                "code": 200,
                "message": "user updated successfully",
                "data": req.body
            });
        }

    });
};


// Auth error processing
// Generic responses for http codes
// Returns:
//   400 - generic error
//   401 - password is not correct
//   403 - email does not exist
var processAuthErrorCode = function(res, errorCode) {
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
};