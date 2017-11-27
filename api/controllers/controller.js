// Controller
// ==========
'use strict';


var path = require('path');


exports.init = function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/HTML', 'index.html'));
};