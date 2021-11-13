const query = require('./mysql');

const addDetection = () => query('INSERT INTO SENSOR (AT) VALUES (NOW());');
const getAllDetections = () => query('SELECT * FROM SENSOR');
const getAllDetectionsPerHour = () => query('SELECT COUNT(*) "NUM", HOUR(AT) "AT" FROM SENSOR GROUP BY HOUR(AT)');

module.exports = {
    addDetection, getAllDetections, getAllDetectionsPerHour
}