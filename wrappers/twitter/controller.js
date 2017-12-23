// Twitter Controller
// =================
'use strict';
var constants = require('../../model/constants').twitter;
var twitterAPI = require('node-twitter-api');
var socialService = require('../../common/services/socialService');
var socialCtrl = require('../../api/controllers/socialController');

// ==============
// OAUTH1 METHODS
// ==============
var twitter = new twitterAPI(constants);
var socialType = {
    id: 3,
    name: 'twitter'
};
var request_token;
var request_token_secret;
var access_token;
var access_token_secret;
var user_data;
exports.getRequestToken = function (req, res) {
    twitter.getRequestToken(function (error, requestToken, requestTokenSecret, results) {
        if (error) {
            console.log("Error getting OAuth request token : " + error);
        } else {
            // Store token and tokenSecret somewhere, you'll need them later; redirect user 
            // request_token = requestToken;
            // request_token_secret = requestTokenSecret;
            var user_id = req.id;
            var columns = ['request_token', 'request_token_secret', 'user_id'];
            var values = [requestToken, requestTokenSecret, user_id];
            var str = "request_token='" + requestToken + "', request_token_secret='" + requestTokenSecret + "', user_id='" + user_id + "'";
            socialService.add(columns, values, str).then(function () {
                res.send({
                    "code": 200,
                    "message": "Got request token successfully",
                    "data": {
                        // Front: Redirect the user to https://twitter.com/oauth/authenticate?oauth_token=[requestToken]
                        "url": twitter.getAuthUrl(requestToken, {
                            force_login: true
                        }),
                        "request_token": requestToken
                    }
                });
            });
        }
    });
}

// Callback function called from Twitter when user logs in
// oauth_token is the request_token returned by getRequestToken
// Example url: http://localhost:3000/api/social/tw/callback?oauth_token=uSZIGQAAAAAA3hiyAAABYHhseWE&oauth_verifier=1dh94FV1yxf5qqF3ziZIRtGTR1yAeesI
exports.getAccessToken = function (request, response) {
    var oauth_token = request.query.oauth_token;
    var oauth_verifier = request.query.oauth_verifier;

    // Use oauth_token (wich is the previous request_token) to retrieve request_token_secret
    socialService.getRequestSecret(oauth_token).then(function (data) {
        var request_token_secret = data.request_token_secret;
        var user_id = data["user_id"];

        twitter.getAccessToken(oauth_token, request_token_secret, oauth_verifier, function (error, accessToken, accessTokenSecret, results) {
            if (error) {
                console.log(error);
            } else {
                //Step 4: Verify Credentials belongs here
                verifyCredentials(accessToken, accessTokenSecret, function (data) {
                    //Store accessToken and accessTokenSecret somewhere (associated to the user)
                    var columns = ['request_token', 'request_token_secret', 'access_token', 'access_token_secret', 'user_id', 'social_id', 'social_type_id', 'login'];
                    var values = [oauth_token, request_token_secret, accessToken, accessTokenSecret, user_id, data.id, socialType.id, data.screen_name];
                    socialCtrl.getParamsStr('UPDATE', columns, values, function (str) {
                        console.log('Authentication successfull!');
                        socialService.add(columns, values, str).catch(function () {
                            // response.send({
                            //     "code": 403,
                            //     "message": "social account already exists"
                            // });
                        });
                    });
                });

            }
        });
    });
}

var verifyCredentials = function (accessToken, accessTokenSecret, callback) {
    var params = {
        skip_status: true
    };
    twitter.verifyCredentials(accessToken, accessTokenSecret, params, function (error, data, response) {
        if (error) {
            // console.log('(verifyCredentials)' + error);
            callback(null);
            //something was wrong with either accessToken or accessTokenSecret 
            //start over with Step 1 
        } else {
            //accessToken and accessTokenSecret can now be used to make api-calls (not yet implemented) 
            //data contains the user-data described in the official Twitter-API-docs 
            callback(data);
        }
    });
}


exports.getUserData = function (req, res) {
    console.log('(twitter-get-user-data)');
    socialCtrl.getSocial(req, res);
}

// ===========
// API METHODS
// ===========

exports.post = function (req, res) {

    twitter.statuses("update", {
            status: req.body.message
        },
        req.body.accessToken,
        req.body.accessTokenSecret,
        function (error, data, response) {
            if (error) {
                // something went wrong
            } else {
                // data contains the data sent by twitter
            }
        }
    );
}