const express = require('express');
const { port } = require('./config/service');
const sensorController = require('./router/sensor');
const app = express();

// Sensor resource
app.use('/sensor',sensorController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})