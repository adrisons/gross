// Social Controller
// =================
'use strict';

var twitterConnector = require('../../wrappers/twitter/connector');
var instagramConnector = require('../../wrappers/instagram/connector');
// var facebookConnector = require('../../wrappers/facebook/connector');


// Authenticate a social network for one user
exports.auth = function(req, res) {
    if (req.body.social === 'twitter') {
        auth(req, res, twitterConnector);
    } else if (req.body.social === 'instagram') {
        auth(req, res, instagramConnector);
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