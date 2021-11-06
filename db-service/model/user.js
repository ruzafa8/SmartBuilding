const query = require('./mysql');

const createUser = (username, plate, password) => query(`INSERT INTO USER (Username, LicensePlate, Password) VALUES ('${username}', '${plate}', MD5('${password}'));`);
const getUser = username => query(`SELECT * FROM USER WHERE USERNAME LIKE '${username} AND VERIFIED IS TRUE';`);
const isPlate = plate => query(`SELECT id, COUNT(*) FROM USER WHERE LICENSEPLATE LIKE '${plate}' AND VERIFIED IS TRUE;`);
const userList = () => query('SELECT id, username, licensePlate, verified FROM USER;');
const updateUser = (id, verified) => query(`
    UPDATE USER
    SET VERIFIED = ${verified}
    WHERE ID = ${id};
`)

const deleteUser = id => query(`DELETE FROM USER WHERE ID=${id}`)

module.exports = {
    createUser, getUser, isPlate, userList, updateUser, deleteUser
}