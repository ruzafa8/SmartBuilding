const fetch = require('node-fetch');
const { db_service } = require('../config/database');

const database = (url, method, body) => fetch(`${db_service}${url}`, {
    method: method, 
    body: body ? JSON.stringify(body) : null
});

const addDetection = () => database("/sensor/add","POST");
const checkPlate = plate => database("/user/check", "POST", {plate}).then(console.log);
const detectedFalse = () => database("/detections/increment?type=false_detection", "POST")
const detectedTrue = () => database("/detections/increment?type=true_detection", "POST")
const detectedBelong = () => database("/detections/increment?type=belong", "POST")
const detectedNotBelong = () => database("/detections/increment?type=not_belong", "POST")

module.exports = {
    addDetection, checkPlate,
    detectedBelong, detectedNotBelong, detectedTrue, detectedFalse
}