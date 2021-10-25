const { createUser, getUser, isPlate, accept, uncheckedList} = require('../models/mysql');

const signIn = (user, plate, password) => {
    createUser(user,plate,password).then(res => {
        console.log("create user ");
        console.log(res);
    }).catch(err => {
        console.log("create user error ");
        console.log(err);
    })
}

const checkPlate = plate => isPlate(plate)
    .then(JSON.stringify)
    .then(JSON.parse)
    .then(res =>{
        console.log(res);
        return res[0]['COUNT(*)'] == 1})
    .catch(err => {
        console.log(err);
        return false;
    });


const logIn = (user, password) => {
    getUser(user).then(console.log).catch(console.log);
}

const acceptPlate = id => {
    accept(id).then(console.log).catch(console.log);
}

const uncheckedPlates = () => uncheckedList()
    .then(JSON.stringify)
    .then(JSON.parse)
    .catch(error => {
    console.log(error);
    return [];
});


module.exports = {
    signIn, checkPlate, logIn, acceptPlate, uncheckedPlates
}