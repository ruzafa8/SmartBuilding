const monitorService = require("../services/monitor");
const cseService = require('../services/cse');
const dbService = require('../services/database');

const processData = (originator, data) => {
    switch(originator) {
        case "ProximitySensor":
            monitorService.onProximitySensor();
            cseService.instanciate("Camera","COMMAND","Shoot");
            break;
        case "Camera":
            console.log("Camara AE made a shoot and published it here:", data);
            cseService.instanciate("LicensePlateRecog","COMMAND", data);
            break;
        case "LicensePlateRecog":
            console.log("License Plate Recognition AE detected this plate:", data);
            if(data == "none") {

            } else {
                const belong = dbService.checkPlate(data);
                cseService.instanciate("Semaphore", "COMMAND", belong ?  "yellow" : "red");
            }
    }
}

module.exports = processData;