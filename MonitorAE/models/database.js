const fetch = require('node-fetch');

const database = (url, method, body) => fetch(`http://localhost:3000/${url}`, {
    method: method, 
    body: body ? JSON.stringify(body) : null
});

const addDetection = () => database("sensor/","POST");

module.exports = {
    addDetection
}