// Creacion de objeto usuario

function User(id, first_name, last_name, email, create_date, update_date, password) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.create_date = create_date;
    this.update_date = update_date;
    this.password = password;
}

function User(data) {
    if (!data.id) {
        console.log("(User) user = " + data);
    }
    this.id = data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.create_date = data.create_date;
    this.update_date = data.update_date;
    this.password = '';
}
module.exports = User;