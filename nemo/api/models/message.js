'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MessageSchema = new Schema({
    text: {
        type: String,
        Required: 'Kindly enter the message'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    user_sender: {
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