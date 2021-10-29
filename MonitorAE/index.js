const cse = require('./services/cse');
const onMessage = require('./models/mqtt');
const {AE_NAME} = require('./config/cse');
const processData = require('./controller/controller');


cse.registerModule(AE_NAME, true, `NAME=${AE_NAME}`,'0').then(() => {
    // subscriptions
    cse.registerSubscription(AE_NAME, "ProximitySensor", "DATA");
    cse.registerSubscription(AE_NAME, "Camera", "DATA");
});

onMessage(async (topic, message) => {
    const response = JSON.parse(message.toString());
    console.log(response);
        const sgn = response.pc["m2m:sgn"];
        if(!sgn) return;

        const ae = sgn.sur.split("/")[1]; //   Mobius/ae name/DATA/SUB_Monitor
        const data = sgn.nev.rep['m2m:cin'].con // content
        processData(ae,data);
});



