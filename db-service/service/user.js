const { createUser, getUser, isPlate, userList, updateUser, deleteUser} = require('../model/user');

const signIn = (user, plate, password) => {
    createUser(user,plate,password).then(res => {
        console.log("User created");
        console.log(res);
    }).catch(err => {
        console.error("create user error");
        console.error(err);
    })
}

const checkPlate = plate => isPlate(plate).then(JSON.stringify).then(JSON.parse)
    .then(res => ({belongs:res[0]['COUNT(*)'] == 1, id: res[0].id}));

const logIn = (user, password) => getUser(user).then(console.log).catch(console.error);
const listUsers = () => userList().then(JSON.stringify).then(JSON.parse)

const userUpdate = (id, verified) => updateUser(id, verified).then(console.log).catch(console.error);
const userDelete = id => deleteUser(id).then(console.log).catch(console.error);

module.exports = {
    signIn, checkPlate, logIn, listUsers, userUpdate, userDelete
}