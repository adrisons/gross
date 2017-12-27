// Logs on finish event
// ====================
// Logger for http calls
exports.httpLogger = function (request, response, next) {
    var start = +new Date();
    var stream = process.stdout;
    var url = request.url;
    var method = request.method;

    response.on('finish', function () {
        var date = '[' + new Date().toISOString() + '] ';
        var duration = +new Date() - start;

        var message = date + method + ' to ' + url +
            ' (' + duration + ' ms)\n';

        stream.write(message);

    });

    next();
};

// Logger for console with date
exports.consoleLogger = function (social_name, method, text) {
    console.log('[' + new Date().toISOString() + '] (' + social_name + '-' + method + '): ' + JSON.stringify(text));
}