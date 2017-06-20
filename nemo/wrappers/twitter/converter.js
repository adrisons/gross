// Converts twitter messages into general messages and viceversa
// =============================================================


// Converts a twitter message into a general one
// =============================================
var twitterToMention = function(twitterMention) {
    var mention = {
        origin: 'twitter',
        id: twitterMention.id_str,
        date: twitterMention.created_at,
        text: twitterMention.text,
        userName: twitterMention.user.name,
        userScreenName: twitterMention.user.screen_name,
        userAvatar: twitterMention.user.profile_image_url,
        userUrl: "http://www.twitter.com/" + twitterMention.user.screen_name
    }

    return mention;
}


// Exports
// =======
exports.twitterToMention = twitterToMention;
// exports.mentionToTwitter = mentionToTwitter;