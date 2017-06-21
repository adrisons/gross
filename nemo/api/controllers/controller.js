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
    if (req.body.social === 'twitter') {
        twitterConnector.postReply(req.body.id, req.body.repliedUserScreenName, req.body.replyText).then(function(data) {
            console.log(data);
        });
    }
};