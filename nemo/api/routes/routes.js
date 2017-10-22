// Messages exchange routing
// =========================

var express = require('express');
var router = express.Router();
var parseRouteName = require('../../common/parsers/parse-route-name')();
var controller = require('../controllers/controller');

// Routing
// =======

router.route('/')
    .get(controller.init)
    .post(function(request, response) {
        response.json('POST Glu glu!');
    });

// Logging
// =======
router.route('/register')
    .post(controller.register);

router.route('/login')
    .post(controller.login);


router.route('/reply')
    .post(controller.reply);


router.route('/:name')
    .all(parseRouteName)
    .get(function(request, response) {
        response.json('GET Requested: ' + request.name);
    })
    .delete(function(request, response) {
        response.json('DELETE Requested: ' + request.name);
    });

module.exports = router;