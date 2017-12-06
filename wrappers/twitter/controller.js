// Twitter Controller
// =================
'use strict';



// Save credentials of a social network for one user
exports.add = function(req, res) {

    const user_rs = {
        type: { id: 1, name: 'twitter' },
        login: '',
        email: 'adrian@gmail.com',
        token: req.body.access_token,
    };
    res.send({
        "code": 200,
        "message": "Social network saved successfully",
        "data": user_rs
    });
}

// Delete social network credentials for one user
exports.remove = function(req, res) {
    req.body.access_token;
    req.body.user_id;
    const user_rs = {
        type: { id: 1, name: 'twitter' },
        login: '',
        email: 'adrian@gmail.com',
        token: req.body.access_token,
    };
    res.send({
        "code": 200,
        "message": "Social network deleted successfully"
            // "data": user_rs
    });
}