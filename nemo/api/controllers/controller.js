// Controller
// ==========
'use strict';


var path = require('path');
// var mongoose = require('mongoose');
// var Message = mongoose.model('Message');
var twitterConnector = require('../../wrappers/twitter/connector');
var instagramConnector = require('../../wrappers/instagram/connector');


exports.init = function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/HTML', 'index.html'));
};

exports.reply = function(req, res) {
    if (req.body.social === 'twitter') {
        reply(req, res, twitterConnector);
    } else if (req.body.social === 'instagram') {
        reply(req, res, instagramConnector);
    }
};

var reply = function(req, res, connector) {
    console.log('Reply: ' + req.body.social + "object:\n" + JSON.stringify(req.body));
    connector.reply(req.body.id, req.body.user.login, req.body.text)
        .then(function(data) {
            console.log(data);
        }).catch(function(reason) {
            console.log(reason.statusCode + " " + reason.error);
        });
};