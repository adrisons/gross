module.exports = function() {
    return function(request, response, next) {
        var id = request.params.id;
        if (id) {
            request.id = id;
            next();
        } else {
            response.status(404).json('No route found for id=' + id);
        }
    }
};