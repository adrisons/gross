// Social Controller
// =================
'use strict';

var service = require('../../common/services/socialService');


// Get body params for insert/update on social_access table
// Params:
// - columns: array for filling the name of the 
// - values
var getParams = function (data, callback) {

    var columns = [];
    var values = [];
    // Required parameters
    if (data.user_id === null) {
        throw ('Error when update social_access: missing user_id. data=' + JSON.stringify(data));
    }
    // if (data.access_token === null || data.user_id === null || data.social_id === null || data.social_type_id === null) {
    //     throw ('Error when update social_access: missing params. data=' + JSON.stringify(data));
    // }
    if (data.request_token) {
        columns.push('request_token');
        values.push(data.request_token);
    }
    if (data.request_token_secret) {
        columns.push('request_token_secret');
        values.push(data.request_token_secret);
    }
    if (data.access_token) {
        columns.push('access_token');
        values.push(data.access_token);
    }
    if (data.access_token_secret) {
        columns.push('access_token_secret');
        values.push(data.access_token_secret);
    }
    if (data.user_id) {
        columns.push('user_id')
        values.push(data.user_id);
    }
    if (data.social_id) {
        columns.push('social_id')
        values.push(data.social_id);
    }
    if (data.social_type_id) {
        columns.push('social_type_id')
        values.push(data.social_type_id);
    }
    if (data.login) {
        columns.push('login')
        values.push(data.login);
    }


    callback(columns, values);
}


// Returns: String with the columns and values for update
// Example: name="A", age=19
var getParamsStr = function (method, columns, values, callback) {
    var paramsStr = '';
    for (var i = 0; i < columns.length; i++) {
        if (paramsStr.length > 0) {
            if (method === 'UPDATE') {
                paramsStr += ', ';
            } else if (method === 'GET') {
                paramsStr += ' AND ';
            }
        }
        paramsStr += columns[i] + '="' + values[i] + '"';
        if (i == columns.length - 1) {
            callback(paramsStr);
        }
    }
}
exports.getParamsStr = getParamsStr;

// Save credentials of a social network for one user
exports.add = function (req, res) {
    getParams(req.body, function (columns, values) {
        getParamsStr('UPDATE', columns, values, function (params) {
            service.add(columns, values, params)
                .then(function () {
                    res.send({
                        "code": 200,
                        "message": "ADD social success!"
                    });
                })
                .catch(function () {
                    res.send({
                        "code": 400,
                        "message": "error ocurred adding social"
                    });
                });
        });
    });
};

// Delete social network credentials
exports.remove = function (req, res) {

    service.remove(req.id).then(function () {
        res.send({
            "code": 200,
            "message": "REMOVE social by id success!",
        });
    }).catch(function (error) {
        res.send({
            "code": 400,
            "message": "REMOVE social by id error!",
        });
    });
};

// Get social accesses with filters
exports.getSocial = function (req, res) {
    console.log('(get-social) params:' + JSON.stringify(req.query));
    getParams(req.query, function (columns, values) {
        getParamsStr('GET', columns, values, function (params) {
            service.getSocial(params)
                .then(function (userSocialData) {
                    console.log('(get-social) userSocial=' + userSocialData);
                    res.send({
                        "code": 200,
                        "message": "GET social success!",
                        "data": userSocialData
                    });
                })
                .catch(function () {
                    res.send({
                        "code": 400,
                        "message": "error ocurred getting social"
                    });
                });
        });
    });
}