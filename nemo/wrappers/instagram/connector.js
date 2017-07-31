// Closest interaction with the specific social network
// ====================================================
// This API only returns the latest 150 comments, so if the media is very
// popular and gets more that 150 comments, you have to time the API call at
// regular intervals and check dates so you dont miss out on some new comments 
// 
// ====================================================

var constants = require('../../model/constants');
var converter = require('./converter');
var request = require('request');
var serverEvents = require('../../server').serverEvents;
// https://github.com/totemstech/instagram-node
var instagram = require('instagram-node').instagram();

var socket;

const baseUrl = "https://api.instagram.com/v1";
const accessTokenUrlParameter = "?access_token=" + constants.instagramTokens.ACCESS_TOKEN;

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
    // Every call to `instagram.use()` overrides the `client_id/client_secret` 
    // or `access_token` previously entered if they exist. 
    instagram.use({ access_token: constants.instagramTokens.ACCESS_TOKEN });
    instagram.use({
        client_id: constants.instagramTokens.CLIENT_ID,
        client_secret: constants.instagramTokens.CLIENT_SECRET
    });
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
                                    socket.emit('mention', instagramToMention(comment));

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

    /* OPTIONS: { [count], [min_timestamp], [max_timestamp], [min_id], [max_id] }; */
    // instagram.user_self_media_recent([options,] function(err, medias, pagination, remaining, limit) {});
    // instagram.use({ access_token: constants.instagramTokens.ACCESS_TOKEN });

    // instagram.user_self_media_recent(function(err, medias, remaining, limit) {
    //     if (err) {
    //         console.log(err.message);
    //         return null;
    //     } else {
    //         return medias;
    //     }
    // });

    var url = baseUrl + "/users/self/media/recent/" + accessTokenUrlParameter;

    return new Promise(function(resolve, reject) {
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Media : ");
                for (c in JSON.parse(body).data) {
                    console.log(c.id + ', ');
                }

                resolve(JSON.parse(body).data);
            } else {
                console.log(response.statusCode + " " + error);
            }
        });
    });
}

// Gets last 150 comments for the specified media
var getCommentsForMedia = function(mediaId) {

    // instagram.comments(mediaId, function(err, result, remaining, limit) {
    //     if (err) {
    //         console.log(err.message);
    //         return null;
    //     } else {
    //         return result;
    //     }
    // });


    var url = baseUrl + "/media/" + mediaId + "/comments" + accessTokenUrlParameter;

    return new Promise(function(resolve, reject) {
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Comments: " + JSON.parse(body).data);
                resolve(JSON.parse(body).data);
            } else {
                console.log(response.statusCode + " " + error);
            }
        });
    });
}


// Reply for a comment
var reply = function(mediaId, login, text) {

    // Add reference to the original user in the message
    if (text.index(login) != -1) {
        text = '@' + login + text;
    }

    instagram.add_comment(mediaId, text, function(err, result, remaining, limit) {
        if (err) {
            console.log(err.message);
            return null;
        } else {
            return result;
        }
    });


    // var url = baseUrl + "/media/" + mediaId + "/comments";

    // request.post({ url: url, access_token: constants.instagramTokens.ACCESS_TOKEN, text: text },
    //     function(err, response, body) {
    //         if (error || response.statusCode != 200) {
    //             console.log(response.statusCode + " " + error);
    //         }
    //     });

}


// Exported functions
// ==================
exports.reply = reply;