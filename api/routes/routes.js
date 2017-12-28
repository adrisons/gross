// Messages exchange routing
// =========================

var express = require('express');
var router = express.Router();
var parseRouteName = require('../../common/parsers/parse-route-name')();
var parseRouteId = require('../../common/parsers/parse-route-id')();
var controller = require('../controllers/controller');
var userController = require('../controllers/userController');
var socialCtrl = require('../controllers/socialController');
var facebookCtrl = require('../../wrappers/facebook/controller');
var twitterCtrl = require('../../wrappers/twitter/controller');
const api = '/api';

// Routing
// =======

router.route(api + '/')
    .get(controller.init)
    .post(function (request, response) {
        response.json('POST Glu glu!');
    });

// User
// ===================================
const userroute = api + '/user';
// Register
router.route(userroute + '/register')
    .post(userController.register);

// Login
router.route(userroute + '/login')
    .post(userController.login);

// Update
router.route(userroute)
    .put(userController.update);

// Social
// ===================================
const socialroute = api + '/social';
// Add new social account
router.route(socialroute)
    .post(socialCtrl.add)
    .get(socialCtrl.getSocial);
// Remove social account from user
router.route(socialroute + '/:id')
    .all(parseRouteId)
    .delete(socialCtrl.remove);




// ========
// Facebook
const fbroute = socialroute + '/fb';


// ========
// Twitter
const twroute = socialroute + '/tw';
// Authentication
router.route(twroute + '/request/:id')
    .all(parseRouteId)
    .get(twitterCtrl.getRequestToken);
router.route(twroute + '/callback')
    .get(twitterCtrl.getAccessToken);
router.route(twroute + '/user-data')
    .get(twitterCtrl.getUserData);


router.route(twroute + '/timeline')
    .get(twitterCtrl.getTimeline);
router.route(twroute)
    .post(twitterCtrl.post);
router.route(twroute + '/retweet/:id')
    .all(parseRouteId)
    .post(twitterCtrl.retweet);
router.route(twroute + '/like/:id')
    .all(parseRouteId)
    .post(twitterCtrl.like);
router.route(twroute + '/unlike/:id')
    .all(parseRouteId)
    .post(twitterCtrl.unlike);

// router.route(api + '/:name')
//     .all(parseRouteName)
//     .get(function(request, response) {
//         response.json('GET Requested: ' + request.name);
//     })
//     .delete(function(request, response) {
//         response.json('DELETE Requested: ' + request.name);
//     });

module.exports = router;