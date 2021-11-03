const { incrementFalseDetection, incrementTrueDetection, 
    incrementBelong, incremenNotBelong, getDetections} = require('../model/detections');

const detectedFalse = () => incrementFalseDetection();
const detectedTrue = () => incrementTrueDetection();
const detectedBelong = () => incrementBelong();
const detectedNotBelong = () => incremenNotBelong();
const getDetectionTypes = () => getDetections().then(JSON.stringify).then(JSON.parse);


module.exports = {
    detectedFalse, detectedTrue, detectedBelong,detectedNotBelong,getDetectionTypes
}