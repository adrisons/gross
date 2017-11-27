// Messages exchange routing
// =========================

var express = require('express');
var router = express.Router();
var parseRouteName = require('../../common/parsers/parse-route-name')();
var controller = require('../controllers/controller');
var userController = require('../controllers/userController');
var socialController = require('../controllers/socialController');
const api = '/api';
// Routing
// =======

router.route(api + '/')
    .get(controller.init)
    .post(function(request, response) {
        response.json('POST Glu glu!');
    });

// User
// ===================================
const user = '/user';
// Register
router.route(api + user + '/register')
    .post(userController.register);

// Login
router.route(api + user + '/login')
    .post(userController.login);

// Update
router.route(api + user)
    .put(userController.update);

// Social
// ===================================
const social = '/social';
// Add new social network to user
router.route(api + social + '/auth')
    .post(socialController.auth);

// Delete social network from user
// router.route(api + social)

//     .delete(socialController.delete);
// Reply to a message
router.route(api + '/reply')
    .post(socialController.reply);

// router.route(api + '/:name')
//     .all(parseRouteName)
//     .get(function(request, response) {
//         response.json('GET Requested: ' + request.name);
//     })
//     .delete(function(request, response) {
//         response.json('DELETE Requested: ' + request.name);
//     });

module.exports = router;