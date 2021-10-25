require('dotenv').config();

module.exports = {
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPass:process.env.DB_PASS,
}

