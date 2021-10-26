const express = require('express');
const { port } = require('./config/service');
const sensorController = require('./controller/sensor');
const app = express();

app.use('/sensor',sensorController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})