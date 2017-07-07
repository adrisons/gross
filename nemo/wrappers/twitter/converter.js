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
        user: {
            name: twitterMention.user.name,
            login: twitterMention.user.screen_name,
            avatar: twitterMention.user.profile_image_url,
            url: "http://www.twitter.com/" + twitterMention.user.screen_name,
            followers: twitterMention.user.followers_count
        },
        retweet_count: twitterMention.retweet_count,
        favorite_count: twitterMention.favorite_count,
        // Nullable. If the represented Tweet is a reply, this field will contain the string representation of the original Tweet’s ID
        replied_id: twitterMention.in_reply_to_status_id_str
    }
    return mention;
}


// Exports
// =======
exports.twitterToMention = twitterToMention;
// exports.mentionToTwitter = mentionToTwitter;