// Creacion de objeto usuario

exports.newUser = function(id, first_name, last_name, email, create_date, update_date, password) {
    return {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        create_date: create_date,
        update_date: update_date,
        password: password,
    }
}

exports.toUser = function(data) {
    if (!data.id) {
        console.log("(User) user = " + data);
    }
    return {

        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        create_date: data.create_date,
        update_date: data.update_date,
        password: '',
    }
}