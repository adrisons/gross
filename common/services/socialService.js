// Service for managing data in the social_access table
var logger = require('../../common/logs/logger').consoleLogger;

var [connection, SCHEMA_NAME] = require('../../common/services/mysqlService');
const TABLE = 'social_access';




// Add. Public function for adding social auth to one user.
// Params:
// - request_token: token for authorize the app.
// - request_token_secret: secret token for getting the access_token.
// - access_token: user token for accessing the user data. REQUIRED
// - access_token_secret: secret user token for verifying.
// - user_id: id of the user in nemo. REQUIRED.
// - social_id: id of the user in the social network. REQUIRED
// - social_type_id: id of the social network.
// - login: login of the user in the social network.
// - type_id: type id of the social network. REQUIRED
// Returns:
// - 200: login successfull
// - 400: generic error
exports.add = function (columns, values, strParamsForUpdate) {
    return new Promise(function (resolve, reject) {
        // Create query
        var query = 'INSERT INTO ' + SCHEMA_NAME + '.' + TABLE + ' (' + columns.join(', ') + ') VALUES (\"' + values.join('\", \"') + '\")';
        query += ' ON DUPLICATE KEY UPDATE ' + strParamsForUpdate;
        logger('social', 'add', query);

        // Call the ddbb
        connection.query(query, function (error, data, fields) {
            if (error) {
                logger('social', 'add', error);
                reject();
            } else {
                logger('social', 'add', data);
                resolve();
            }
        });


    });
};

// Remove. Public function for removing social auth from one user
// Returns:
//   200 - remove successfull
//   400 - generic error
exports.remove = function (access_id) {
    var query = 'DELETE FROM ' + SCHEMA_NAME + '.' + TABLE + ' WHERE id = ' + access_id;
    logger('social', 'remove', query);
    return new Promise(function (resolve, reject) {
        connection.query(query, function (error, results, fields) {
            if (error) {

                logger('social', 'remove', error);
                reject(400);
            } else {
                logger('social', 'remove', results);
                resolve(200);
            }
        });
    });
}

exports.getSocial = function (variables) {
    return new Promise(function (resolve, reject) {
        // Create query
        var query = "SELECT sa.id, sa.social_id, sa.user_id, sa.social_type_id, st.name as 'social_type_name', sa.access_token, sa.login ";
        query += ' FROM ' + SCHEMA_NAME + '.' + TABLE + ' sa ';
        query += ' JOIN nemo.social_type st ON sa.social_type_id=st.id ';
        query += ' WHERE ' + variables;
        
        logger('social', 'get', query);
        // Call the ddbb
        connection.query(query, function (error, results, fields) {
            if (error) {
                logger('social', 'get', error);
                
                reject();
            } else {
                logger('social', 'get', results);
                resolve(results);
            }
        });
    });
}

var getSocialId = function (social_type_id, user_id, social_id, resolve, reject) {
    var query = 'SELECT id FROM ' + SCHEMA_NAME + '.' + TABLE +
        ' where social_type_id=' + social_type_id + ' and user_id=' + user_id + ' and social_id=' + social_id;
        logger('social', 'getSocialId', query);
    return new Promise(function (resolve, reject) {
        connection.query(query, function (error, results, fields) {
            if (error) {
                logger('social', 'getSocialId', error);
                reject(400);
            } else {
                logger('social', 'getSocialId', results);
                resolve(results[0]);
            }
        });
    });

}


exports.getRequestSecret = function (request_token) {
    return new Promise(function (resolve, reject) {
        // Create query
        var query = "SELECT request_token_secret, user_id ";
        query += ' FROM ' + SCHEMA_NAME + '.' + TABLE;
        query += ' WHERE request_token="' + request_token + '"';
        logger('social', 'getRequestSecret', query);
        // Call the ddbb
        connection.query(query, function (error, results, fields) {
            if (error) {
                logger('social', 'getRequestSecret', error);
                reject();
            } else {
                logger('social', 'getRequestSecret', results);
                resolve(results[0]);
            }
        });
    });
}




exports.getAccessSecret = function (access_token, user_id) {
    return new Promise(function (resolve, reject) {
        // Create query
        var query = "SELECT access_token_secret";
        query += ' FROM ' + SCHEMA_NAME + '.' + TABLE;
        query += ' WHERE access_token="' + access_token + '" AND user_id="' + user_id + '"';
        console.log('(get-access-secret) query:' + query);
        // Call the ddbb
        connection.query(query, function (error, results, fields) {
            if (error) {
                console.log("(get-access-secret) error ocurred", error);
                reject();
            } else {
                console.log('(get-access-secret) The solution is: ', JSON.stringify(results));
                resolve(results[0]);
            }
        });
    });
}