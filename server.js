// Server main file
// ================
'use strict';

var express = require('express');
var app = express();
// var mongoose = require('mongoose');
var Message = require("./api/models/message");
var bodyParser = require('body-parser');
var events = require('events');
var serverEvents = new events.EventEmitter();

// BBDD
// ======================
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/Messages");

// export the serverEvents object so others can use it
exports.serverEvents = serverEvents;

// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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

// To redirect and respond whenever a wrong route is requested
app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

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