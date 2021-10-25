const monitorService = require("../services/monitor");

const processData = (originator, data) => {
    switch(originator) {
        case "ProximitySensor":
            monitorService.onProximitySensor();
            break;
        case "Camera":
            break;
    }
}

module.exports = processData;