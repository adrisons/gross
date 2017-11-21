// Creacion de objeto usuario
exports.newObject = function(first_name, last_name, email, create_time, modify_time, password) {
    return {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "create_time": create_time,
        "modify_time": modify_time,
        "password": password
    }
}

exports.newObject = function(userData) {
    return {
        "first_name": userData.first_name,
        "last_name": userData.last_name,
        "email": userData.email,
        "create_time": userData.create_time,
        "modify_time": userData.modify_time
    }
}