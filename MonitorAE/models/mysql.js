const mysql = require('mysql');
const { dbHost, dbUser, dbPass } = require('../config/mysql');
const queries = require("./sqlSentences");


const con = mysql.createConnection({host: dbHost, user: dbUser,password: dbPass, 
    //database: "BUILDING"
});

con.connect(err => {
    if (err) console.log("There was an error:", err);
    else {
        console.log("Connected!");
        query(queries.createDB)
            .then(() => query(queries.setDB))
            .then(() => query(queries.createTableUser))
            .then(() => query(queries.createTableSensor))
        
    }
});

const query = sql => new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
        if (err) reject(err);
        else resolve(result);
    });
});

// User Table  
const createUser = (username, plate, password) => query(`INSERT INTO USER (USERNAME, PLATE, PASSWORD) VALUES ('${username}', '${plate}', MD5('${password}'));`);
const getUser = username => query(`SELECT * FROM USER WHERE USERNAME LIKE '${username} AND REVISED IS TRUE';`);
const isPlate = plate => query(`SELECT COUNT(*) FROM USER WHERE PLATE LIKE '${plate}' AND REVISED IS TRUE;`);
const accept = id => query(`UPDATE USER SET REVISED = TRUE WHERE ID = ${id};`);
const uncheckedList = () => query('SELECT ID, USERNAME, PLATE FROM USER WHERE REVISED IS FALSE;');

// Sensor Table
const addDetection = () => query('INSERT INTO SENSOR (AT) VALUES (NOW());');
const getAllDetections = () => query('SELECT * FROM SENSOR');

module.exports = {
    createUser, getUser, isPlate, accept, uncheckedList,
    addDetection, getAllDetections,
}