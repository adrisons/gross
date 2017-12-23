// Server main file
// ================
'use strict';

var express = require('express');
var expressJwt = require('express-jwt');
var app = express();
var bodyParser = require('body-parser');
var serverEvents = new(require('events')).EventEmitter();
var config = require('./model/constants.js').config;
var cors = require('cors');
// export the serverEvents object so others can use it
exports.serverEvents = serverEvents;

// Add headers
app.use(cors());
// app.use(function(req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, authorization');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

// Logging
// ======================
var logger = require('./common/logs/logger');
app.use(logger);

// Necesario para la recuperación de parámetros de un post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
    secret: config.secret,
    getToken: function(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/api/user/login', '/api/user/register', '/api/social/tw/callback'] }));
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

// Server configuration
// ====================
const PORT = process.env.PORT || 3000;

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

// var io = require('socket.io')(server);

// Bidirectional conection with front
// ==================================
// io.on('connection', function(socket) {
// serverEvents.emit('socket', socket);
// });

// Tell the connectors to start listening
// ======================================
// serverEvents.emit('connector');