var [connection, SCHEMA_NAME] = require('../../common/services/mysqlService');
const TABLE = 'social_access';


// Add. Public function for adding social auth to one user
// Returns:
//   200 - login successfull
//   400 - generic error
exports.add = function(req, res) {
    if (req.body.length < COLUMNS_NUM) {
        // throw error!
    }
    'INSERT INTO ' + SCHEMA_NAME + '.' + TABLE + ' (' + ') VALUES (';
    var columns = [];
    var values = [];
    if (req.body.token) {
        columns.push('token')
        values.push(req.body.token);
    }
    if (req.body.login) {
        columns.push('login')
        params.push(req.body.login);
    }
    // Create query
    var query = 'INSERT INTO ' + SCHEMA_NAME + '.' + TABLE + ' (' + columns.join(',') + ') VALUES (' + values.join(',') + ')';

    // Call the ddbb
    return new Promise(function(resolve, reject) {
        connection.query(query, function(error, results, fields) {
            if (error) {
                console.log("(add-social) error ocurred", error);
                reject(400);
            } else {
                console.log('(add-social) The solution is: ', results);
                resolve(200);
            }
        });
    });
};

// Remove. Public function for removing social auth from one user
// Returns:
//   200 - login successfull
//   400 - generic error
exports.remove = function(req, res) {}