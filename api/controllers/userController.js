// Controller
// ==========
'use strict';

var bbddService = require('../../common/services/userService');


exports.register = function(req, res) {
    bbddService.register(req, res);
};


exports.login = function(req, res) {
    bbddService.login(req, res);
};

exports.update = function(req, res) {
    bbddService.update(req, res);
};