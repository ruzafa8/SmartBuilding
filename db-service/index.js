const express = require('express');
const { port } = require('./config/service');
const sensorController = require('./router/sensor');
const cors = require('cors');
const app = express();

app.use(cors());
// Sensor resource
app.use('/sensor',sensorController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})