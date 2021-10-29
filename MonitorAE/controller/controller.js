const monitorService = require("../services/monitor");
const cseService = require('../services/cse')

const processData = (originator, data) => {
    switch(originator) {
        case "ProximitySensor":
            monitorService.onProximitySensor();
            cseService.instanciate("Camera","COMMAND","Shoot");
            break;
        case "Camera":
            console.log("Camara AE made a shoot and published it here:", data);
            break;
    }
}

module.exports = processData;