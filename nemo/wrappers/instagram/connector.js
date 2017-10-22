// Closest interaction with the specific social network
// ====================================================
// This API only returns the latest 150 comments, so if the media is very
// popular and gets more that 150 comments, you have to time the API call at
// regular intervals and check dates so you dont miss out on some new comments 
// 
// ====================================================

var constants = require('../../model/constants').instagram;
var converter = require('./converter');
var request = require('request');
var serverEvents = require('../../server').serverEvents;

var socket;

const baseUrl = "https://api.instagram.com/v1";
const accessTokenUrlParameter = "?access_token=" + constants.tokens.ACCESS_TOKEN;

var refreshInterval = 6000;
var addedComments = {};


// Event listeners
// =============================================

// Sets the communication socket between modules
serverEvents.on('socket', function(_socket) {
    socket = _socket;
});

// Starts the listening for mentions
serverEvents.on('connector', function() {
    listen();
});

// Private functions
// ===================================================

// Listen to new comments and emit them through the socket
var listen = function() {

    setInterval(function() {

        // get last photos
        getMyRecentMedia().then(function(medias) {
            for (media of medias) {

                // select the ones with comments
                if (media.comments.count > 0) {

                    // get the comments
                    getCommentsForMedia(media.id).then(function(comments) {
                        for (comment of comments) {

                            // this is a new comment
                            if (!addedComments[comment.id]) {

                                // send it through the socket
                                if (socket) {
                                    var mention = converter.instagramToMention(comment);
                                    socket.emit('mention', mention);

                                    // Mark as saved
                                    addedComments[comment.id] = true;
                                }
                            }
                        }
                    });
                }
            }
        });

    }, refreshInterval);
}


// Gets recent  media
var getMyRecentMedia = function() {

    var url = baseUrl + "/users/self/media/recent/" + accessTokenUrlParameter;

    return new Promise(function(resolve, reject) {
        request.get({ url }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body).data);
            } else {
                console.log(response.statusCode + " " + error);
                console.log(response.body);
            }
        });
    });
}

// Gets last 150 comments for the specified media
var getCommentsForMedia = function(mediaId) {

    var url = baseUrl + "/media/" + mediaId + "/comments" + accessTokenUrlParameter;
    return new Promise(function(resolve, reject) {
        request.get({ url }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body).data);
            } else {
                console.log(response.statusCode + " " + error);
            }
        });
    });
}


// Reply for a comment
var reply = function(mediaId, login, text) {

    return new Promise(function(resolve, reject) {

        // Add reference to the original user in the message
        if (text && text.indexOf(login) == -1) {
            text = '@' + login + ' ' + text;
        }
        if (!text || text.length > constants.MAX_COMMENT_SIZE) {
            console.log('Error: comment length (' + text.length + ') exceeds maximum length (' + constants.MAX_COMMENT_SIZE + ')');
            console.log('Comment: ' + text);
            return;
        }

        var url = baseUrl + "/media/" + mediaId + "/comments";

        request.post({ url: url, form: { access_token: constants.tokens.ACCESS_TOKEN, text: text } },
            function(error, response, body) {
                if (response.statusCode != 200) {
                    reject({ statusCode: response.statusCode, error: error ? error : body });
                }
                resolve(true);
            });
    });

}


// Exported functions
// ==================
exports.reply = reply;