// Messages exchange routing
// =========================

var express = require('express');
var router = express.Router();
var parseRouteName = require('../../common/parsers/parse-route-name')();
var controller = require('../controllers/controller');
var userController = require('../controllers/userController');
const api = '/api';
const user = '/user';
// Routing
// =======

router.route(api + '/')
    .get(controller.init)
    .post(function(request, response) {
        response.json('POST Glu glu!');
    });

// User
// =======

router.route(api + user + '/register')
    .post(userController.register);

router.route(api + user + '/login')
    .post(userController.login);

router.route(api + user)
    .put(userController.update);

// Social
// =======
router.route(api + '/reply')
    .post(controller.reply);


// router.route(api + '/:name')
//     .all(parseRouteName)
//     .get(function(request, response) {
//         response.json('GET Requested: ' + request.name);
//     })
//     .delete(function(request, response) {
//         response.json('DELETE Requested: ' + request.name);
//     });

module.exports = router;