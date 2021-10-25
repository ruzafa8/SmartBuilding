const express = require('express');
const router = express.Router();
const { detect, getDetections } = require('../service/sensor')

// respond with "hello world" when a GET request is made to the homepage
router.post('/value/add', (req, res) => {
    detect().then(() => {
        console.log("Detection added correctly");
        res.status(201);
    }).catch(() => {
        console.error("There was an error while storing the detection");
        res.status(500);
    })
});

router.get('/values', async (req, res) => {
    try{
        console.log("retrieving all the sensor values");
        const res = await getDetections();
        res.send(res).status(200);
    } catch(error) {
        console.error(error);
        res.status(500);
    }
});

module.exports = router;