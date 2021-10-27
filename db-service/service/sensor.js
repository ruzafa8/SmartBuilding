const {addDetection, getAllDetections, getAllDetectionsPerHour} = require('../model/sensor');

const detect = () => addDetection();
const getDetections = () => getAllDetections().then(JSON.stringify).then(JSON.parse);
const getDetectionsPerHour = () => getAllDetectionsPerHour().then(JSON.stringify).then(JSON.parse);


module.exports = {
    detect, getDetections, getDetectionsPerHour
}