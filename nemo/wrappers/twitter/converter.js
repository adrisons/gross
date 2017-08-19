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
        // Nullable. If the represented Tweet is a reply, this field will contain the string representation of the original Tweet’s ID
        replied_id: twitterMention.in_reply_to_status_id_str
    }
    return mention;
}

// Converts a general message into a twitter one
// =============================================
var mentionToTwitter = function(mention) {
    var twitterMention = {
        id_str: mention.id,
        created_at: mention.date,
        text: mention.text,
        user: {
            name: mention.user.name,
            screen_name: mention.user.login,
            profile_image_url: mention.user.avatar
        },
        // Nullable. If the represented Tweet is a reply, this field will contain the string representation of the original Tweet’s ID
        in_reply_to_status_id_str: mention.replied_id
    }
    return twitterMention;
}


// Exports
// =======
exports.twitterToMention = twitterToMention;
exports.mentionToTwitter = mentionToTwitter;