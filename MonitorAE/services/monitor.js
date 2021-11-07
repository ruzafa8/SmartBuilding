const {addDetection} = require('../models/database');

const onProximitySensor = () => {
    console.log("Proximity Sensor detected the presence of something");

    console.log("Storing the detection on the database");
    addDetection();
    
    console.log("Comunicating to the Camera to take a photo...");

    // TODO: create CI at COMMAND CNT of CameraAE to take a photo
}

module.exports = {
    onProximitySensor,
}
