const query = require('./mysql');

const addDetection = () => query('INSERT INTO SENSOR (AT) VALUES (NOW());');
const getAllDetections = () => query('SELECT * FROM SENSOR');

module.exports = {
    addDetection, getAllDetections,
}