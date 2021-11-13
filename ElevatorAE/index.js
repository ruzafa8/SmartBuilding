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
            // Tell the elevator what floor to go
            rosemary.instanciate("Elevator_Motor", "COMMAND", data);
            break;
        case "Elevator_ProximitySensor":
            // Tell the Screen that someone is in front the elevator
            rosemary.instanciate("Elevator_Screen", "COMMAND", "detect");
            // It could be added an instruction to store the number of detections at database
            break;
        case "Elevator_Screen":
            // The screen tells an otp, which is stored at database
            elevatorService.setOTP(1,data);
            // When the user send the OTP from the mobile frontend (Thrugh HTTP),
            // It will be contrasted with the one at database
            break;
        case "Elevator_Motor":
            console.log("The elevator is at " + data + " floor");
            // It could be added an instruction to store the floors where the elevator goes
            break;

    }
}

