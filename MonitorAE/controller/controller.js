const monitorService = require("../services/monitor");
const cseService = require('../services/cse');
const dbService = require('../models/database');

const processData = (originator, data) => {
    switch(originator) {
        case "ProximitySensor":
            monitorService.onProximitySensor();
            cseService.instanciate("Camera","COMMAND","Shoot");
            cseService.instanciate("Semaphore", "COMMAND", "yellow");
            break;
        case "Camera":
            console.log("Camara AE made a shoot and published it here:", data);
            cseService.instanciate("LicensePlateRecog","COMMAND", data);
            break;
        case "LicensePlateRecog":
            console.log("License Plate Recognition AE detected this plate:", data);
            if(data == "none") {
                dbService.detectedFalse();
                cseService.instanciate("Semaphore", "COMMAND", "red");
            } else {
                dbService.detectedTrue();
                const {belongs, id} = dbService.checkPlate(data);
                if(belongs){
                    console.log("This plate belongs to the building");
                    dbService.detectedBelong();
                    cseService.instanciate("Motor","COMMAND", "open");
                    cseService.instanciate("MobileApp", "COMMAND", id);
                    cseService.instanciate("Semaphore", "COMMAND", "yellow");
                    //cseService.instanciate("Elevator", "COMMAND", 0);
                } else{ 
                    console.log("This plate does not belongs to the building");
                    dbService.detectedNotBelong();
                    cseService.instanciate("Semaphore", "COMMAND", "red");
                }
            }
            break;
        case "Motor":
            if(data == "opened") {
                cseService.instanciate("Semaphore", "COMMAND", "green");
                setTimeout(() => {
                    cseService.instanciate("Motor","COMMAND", "close");
                },5000);
            } else if(data == "closed") {
                cseService.instanciate("Semaphore", "COMMAND", "red");
            }
            break;
    }
}

module.exports = processData;