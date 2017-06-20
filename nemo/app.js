var express = require('express');
var app = express();

var logger = require('./common/logs/logger');
app.use(logger);

app.use(express.static('public'));

var messages = require('./routes/messages');
app.use('/', messages);

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Node server running on http://localhost:3000");
});