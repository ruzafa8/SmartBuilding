const express = require('express');
const sensorController = require('./controller/sensor');
const app = express();

app.use('/sensor',sensorController);

const port = '3000';
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})