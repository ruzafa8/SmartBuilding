const mqtt = require('mqtt');
const {mqtt_endpoint} = require('../config/mqtt')
const {CSE_PATH, AE_NAME} = require('../config/cse');

var client  = mqtt.connect(mqtt_endpoint);

client.on('connect', () => {
    client.subscribe(`/oneM2M/req/${CSE_PATH}/${AE_NAME}/json`);
})

const onMessage = fn => client.on("message", fn);

module.exports = onMessage
