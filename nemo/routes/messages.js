// Messages exchange routing
// =========================

var express = require('express');
var router = express.Router();
var path = require('path');
var parseRouteName = require('../common/parsers/parse-route-name')();
var twitterConnector = require('../wrappers/twitter/connector');
// var instagramConnector = require('./instagramConnector');


// Routing
// =======

router.route('/')
    .get(function(request, response) {
        response.sendFile(path.join(__dirname, '../public/HTML', 'index.html'));
    })
    .post(function() { console.log("post") }, function(request, response) {
        response.json('POST Glu glu!');
    });


router.route('/reply')
    .post(function() { console.log("post") }, function(request, response) {

        if (request.body.social === 'twitter') {
            twitterConnector.postReply(req.body.id, req.body.repliedUserScreenName, req.body.replyText).then(function(data) {
                console.log(data);
            });
        }
    });


router.route('/:name')
    .all(parseRouteName)
    .get(function(request, response) {
        response.json('GET Requested: ' + request.name);
    })
    .delete(function(request, response) {
        response.json('DELETE Requested: ' + request.name);
    });

module.exports = router;