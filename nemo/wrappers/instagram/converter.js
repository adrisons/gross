// Converts instagram messages into general messages and viceversa
// =============================================================


// Converts a instagram message into a general one
// =============================================
var instagramToMention = function(instagramMention) {
    var mention = {
        origin: 'instagram',
        id: instagramMention.id,
        date: instagramMention.created_time,
        text: instagramMention.text,
        user: {
            name: instagramMention.from.full_name,
            login: instagramMention.from.username,
            avatar: instagramMention.from.profile_picture,
            url: "http://www.instagram.com/" + instagramMention.from.username,
            followers: undefined
        },
        // Nullable. If the represented Message is a reply, this field will contain the string representation of the original Message’s ID
        replied_id: undefined
    }
    return mention;
}


// Exports
// =======
exports.instagramToMention = instagramToMention;
// exports.mentionToInstagram = mentionToInstagram;