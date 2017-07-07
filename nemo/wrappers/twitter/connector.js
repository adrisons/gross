// Closest interaction with the specific social network
// ====================================================

var Twitter = require('twitter');
var constants = require('../../model/constants');
var converter = require('./converter');
var serverEvents = require('../../server').serverEvents;

var socket;

// Twitter object initialization with auth data
// ============================================
var twitter = new Twitter({
    consumer_key: constants.twitterTokens.CONSUMER_KEY,
    consumer_secret: constants.twitterTokens.CONSUMER_SECRET,
    access_token_key: constants.twitterTokens.ACCESS_TOKEN_KEY,
    access_token_secret: constants.twitterTokens.ACCESS_TOKEN_SECRET,
});

// Event listeners
// =============================================

// Sets the communication socket between modules
serverEvents.on('socket', function(_socket) {
    socket = _socket;
});

// Starts the listening for mentions
serverEvents.on('connector', function() {
    listenTwitter();
});

// Private functions
// ===================================================

// Listen to mentions and emit them through the socket
var listenTwitter = function() {
    twitter.stream('statuses/filter', { track: constants.twitterTokens.USER_NAME }, function(stream) {
        stream.on('data', function(data) {
            socket.emit('mention', converter.twitterToMention(data));
        });

        stream.on('error', function(error) {
            console.log('Error: ' + error);
        });
    });

}

// Post a reply to a tweet
var postReply = function(id, login, text) {

    return new Promise(function(resolve, reject) {
        twitter.post('statuses/update', {
                status: "@" + login + " " + text,
                in_reply_to_status_id: id
            },
            function(error, tweet, response) {
                if (error) {
                    console.log(error);
                } else {
                    resolve(tweet);
                }
            }
        );
    });
};


// Exported functions
// ==================
exports.postReply = postReply;