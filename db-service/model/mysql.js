const mysql = require('mysql');
const { dbHost, dbUser, dbPass } = require('../config/mysql');
const queries = require("./sqlSentences");

const con = mysql.createConnection({host: dbHost, user: dbUser,password: dbPass});

con.connect(err => {
    if (err) console.error("There was an error on database connection:", err);
    else {
        console.log("Database connected!");
        query(queries.createDB)
            .then(() => query(queries.setDB))
            .then(() => query(queries.createTableUser))
            .then(() => query(queries.createTableSensor))
            .then(() => query(queries.createTableDetections))
            .then(() => query(queries.initialTableDetections))
    }
});

const query = sql => new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
        if (err) reject(err);
        else resolve(result);
    });
});

module.exports = query;