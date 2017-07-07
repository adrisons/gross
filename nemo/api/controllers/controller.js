// Controller
// ==========
'use strict';


var path = require('path');
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var twitterConnector = require('../../wrappers/twitter/connector');
// var instagramConnector = require('./instagramConnector');


exports.init = function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/HTML', 'index.html'));
};

exports.reply = function(req, res) {
    console.log("reply!");
    if (req.body.social === 'twitter') {
        console.log("twitter object:\n" + JSON.stringify(req.body));
        twitterConnector.postReply(req.body.id, req.body.login, req.body.text).then(function(data) {
            console.log(data);
        });
    }
};