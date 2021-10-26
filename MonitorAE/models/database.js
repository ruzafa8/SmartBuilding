const fetch = require('node-fetch');
const { db_service } = require('../config/database');

const database = (url, method, body) => fetch(`${db_service}/${url}`, {
    method: method, 
    body: body ? JSON.stringify(body) : null
});

const addDetection = () => database("sensor/","POST");

module.exports = {
    addDetection
}