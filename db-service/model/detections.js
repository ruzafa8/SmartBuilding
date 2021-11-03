const query = require('./mysql');

const incrementFalseDetection = () => query(`UPDATE DETECTIONS 
    SET FALSE_DETECTION = FALSE_DETECTION + 1
    WHERE ID = 0;`);
const incrementTrueDetection = () => query(`UPDATE DETECTIONS 
    SET TRUE_DETECTION = TRUE_DETECTION + 1
    WHERE ID = 0;`);
const incrementBelong = () => query(`UPDATE DETECTIONS 
    SET BELONG = BELONG + 1
    WHERE ID = 0;`);
const incremenNotBelong = () => query(`UPDATE DETECTIONS 
    SET NOT_BELONG = NOT_BELONG + 1
    WHERE ID = 0;`);

const getDetections = () => query("SELECT * FROM DETECTIONS WHERE ID = 0;");

module.exports = {
    incrementFalseDetection, incrementTrueDetection, incrementBelong, incremenNotBelong,
    getDetections
}