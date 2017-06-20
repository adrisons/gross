var express = require('express');
var router = express.Router();

var parseRouteName = require('../common/parsers/parse-route-name')();


router.route('/')
    .get(function(request, response) {
        response.json('GET Glu glu!');
    })
    .post(function() { console.log("post") }, function(request, response) {
        response.json('POST Glu glu!');
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