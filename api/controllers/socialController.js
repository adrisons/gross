// Social Controller
// =================
'use strict';

var twitterConnector = require('../../wrappers/twitter/connector');
var instagramConnector = require('../../wrappers/instagram/connector');
// var facebookConnector = require('../../wrappers/facebook/connector');


// Save credentials of a social network for one user
exports.add = function(req, res) {
    // Guardar token y tipo de red social para el usuario
    const user_rs = {
        type: { id: 0, name: 'facebook' },
        login: '',
        email: 'adrian@gmail.com',
        token: req.body.access_token,
    };
    res.send({
        "code": 200,
        "message": "Social network saved successfully",
        "data": user_rs
    });
    if (req.body.social === 'twitter') {
        // add(req, res, twitterConnector);
    } else if (req.body.social === 'facebook') {
        // add(req, res, instagramConnector);
    }
};
// Delete social network credentials for one user
exports.delete = function(req, res) {
    // Guardar token y tipo de red social para el usuario
    res.send({
        "code": 200,
        "message": "Social network deleted successfully",
        "token": req.body.access_token,
        // "data": user_rs
    });
    if (req.body.social === 'twitter') {
        // delete(req, res, twitterConnector);
    } else if (req.body.social === 'facebook') {
        // delete(req, res, instagramConnector);
    }
};

// Reply to a message
exports.reply = function(req, res) {
    if (req.body.social === 'twitter') {
        reply(req, res, twitterConnector);
    } else if (req.body.social === 'instagram') {
        reply(req, res, instagramConnector);
    }
};


// PRIVATE FUNCTIONS
// =================

var reply = function(req, res, connector) {
    console.log('Reply ' + req.body.social + ": " + JSON.stringify(req.body));
    connector.reply(req.body.id, req.body.user.login, req.body.text)
        .then(function(data) {
            console.log(data);
        }).catch(function(reason) {
            console.log(reason.statusCode + " " + reason.error);
        });
};