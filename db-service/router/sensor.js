const express = require('express');
const router = express.Router();
const { detect, getDetections } = require('../service/sensor')

// Add a value at sensor 
router.post('/', (req, res) => {
    detect().then(() => {
        console.log("Detection added correctly");
        res.status(201);
    }).catch(() => {
        console.error("There was an error while storing the detection");
        res.status(500);
    })
});

// retrieve all sensor values stored
router.get('/', async (req, res) => {
    try{
        console.log("Retrieving all the sensor values");
        const res = await getDetections();
        res.send(res).status(200);
    } catch(error) {
        console.error(error);
        res.status(500);
    }
});

module.exports = router;