// Server main file
// ================
'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Message = require("./api/models/message");
var bodyParser = require('body-parser');
var events = require('events');
var serverEvents = new events.EventEmitter();

// BBDD
// ======================
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/Messages");

// export the serverEvents object so others can use it
exports.serverEvents = serverEvents;

// Logging
// ======================
var logger = require('./common/logs/logger');
app.use(logger);

// Server configuration
// ====================
const PORT = process.env.PORT || 3000;
// Necesario para la recuperación de parámetros de un post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static resources
// ================
app.use(express.static('public'));

// Routing
// =======
var routes = require('./api/routes/routes');
app.use('/', routes);


// Run server
// ==========
var server = app.listen(PORT, function() {
    console.log("Nemo server running on http://localhost:" + PORT);
});

var io = require('socket.io')(server);

// Bidirectional conection with front
// ==================================
io.on('connection', function(socket) {
    serverEvents.emit('socket', socket);
});

// Tell the connectors to start listening
// ======================================
serverEvents.emit('connector');