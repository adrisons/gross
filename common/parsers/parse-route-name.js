module.exports = function() {
    return function(request, response, next) {
        var name = request.params.name;
        if (name) {
            var blockName = name.toLowerCase();
            request.name = blockName;
            next();
        } else {
            response.status(404).json('No route found for ' + name);
        }
    }
};