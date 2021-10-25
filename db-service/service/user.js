const { createUser, getUser, isPlate, accept, uncheckedList} = require('../model/user');

const signIn = (user, plate, password) => {
    createUser(user,plate,password).then(res => {
        console.log("User created");
        console.log(res);
    }).catch(err => {
        console.error("create user error");
        console.error(err);
    })
}

const checkPlate = plate => isPlate(plate)
    .then(JSON.stringify)
    .then(JSON.parse)
    .then(res => res[0]['COUNT(*)'] == 1)
    .catch(err => {
        console.error(err);
        return false;
    });


const logIn = (user, password) => {
    getUser(user).then(console.log).catch(console.error);
}

const acceptPlate = id => {
    accept(id).then(console.log).catch(console.error);
}

module.exports = {
    signIn, checkPlate, logIn, acceptPlate
}