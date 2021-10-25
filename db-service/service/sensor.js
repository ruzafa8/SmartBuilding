const {addDetection, getAllDetections} = require('../model/sensor');

const detect = () => addDetection();
const getDetections = () => getAllDetections().then(JSON.stringify).then(JSON.parse);

module.exports = {
    detect, getDetections
}