const query = require('./mysql');

const createUser = (username, plate, password) => query(`INSERT INTO USER (USERNAME, PLATE, PASSWORD) VALUES ('${username}', '${plate}', MD5('${password}'));`);
const getUser = username => query(`SELECT * FROM USER WHERE USERNAME LIKE '${username} AND REVISED IS TRUE';`);
const isPlate = plate => query(`SELECT COUNT(*) FROM USER WHERE PLATE LIKE '${plate}' AND REVISED IS TRUE;`);
const accept = id => query(`UPDATE USER SET REVISED = TRUE WHERE ID = ${id};`);
const uncheckedList = () => query('SELECT ID, USERNAME, PLATE FROM USER WHERE REVISED IS FALSE;');

module.exports = {
    createUser, getUser, isPlate, accept, uncheckedList,
}