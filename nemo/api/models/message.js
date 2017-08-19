'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MessageSchema = new Schema({
    origin: {
        type: [{
            type: String,
            enum: ['twitter', 'instagram', 'facebook']
        }],
        Required: 'Kindly enter the social network'
    },
    // Message Id from the social network
    id: {
        type: String,
        Required: 'Kindly enter the message id'
    },
    // Created date
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        Required: 'Kindly enter the message'
    },
    // Login of the user sender
    user_login: {
        type: String,
        Required: 'Kindly enter the login of the user'
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'replied']
        }],
        default: ['pending']
    }
});

module.exports = mongoose.model('Message', MessageSchema);