const express = require('express');
const { port } = require('./config/service');
const sensorController = require('./router/sensor');
const detectionsController = require('./router/detections');
const userController = require('./router/user');
const cors = require('cors');
const app = express();

app.use(cors());
// Sensor resource
app.use('/sensor', sensorController);
app.use('/detections', detectionsController);
app.use('/user', userController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})