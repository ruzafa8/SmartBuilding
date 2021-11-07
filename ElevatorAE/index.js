const express = require('express');
const { port } = require('./config/service');
const elevatorController = require('./router/elevator');
const cors = require('cors');
const {AE_NAME} = require('./config/cse');
const elevatorService = require('./service/elevator');
const app = express();
const cse = require('./service/cse')
const rosemary = require('./service/rosemary')

app.use(cors());
// elevator resource
app.use('/elevator', elevatorController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

cse.registerModule(AE_NAME, true, `NAME=${AE_NAME}`,'0').then(() => {});
rosemary.registerModule(AE_NAME, false, `NAME=${AE_NAME}`,'0').then(() => {});

onMessage(async (topic, message) => {
    const response = JSON.parse(message.toString());
    console.log(response);
        const sgn = response.pc["m2m:sgn"];
        if(!sgn) return;

        const ae = sgn.sur.split("/")[1]; //   Mobius/ae name/DATA/SUB_Monitor
        const data = sgn.nev.rep['m2m:cin'].con // content
        processData(ae,data);
});

const processData = (ae, data) => {
    switch(ae) {
        case AE_NAME:
            // TODO: create CI to Motor
            break;
        case "Elevator_ProximitySensor":
            elevatorService.changeOTP(1,data);
            break;
        case "Elevator_Screen":
            elevatorService.setOTP(1,data);
            break;
        case "Elevator_Motor":
            break;

    }
}

