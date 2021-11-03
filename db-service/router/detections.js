const express = require('express');
const router = express.Router();
const { detectedFalse, detectedTrue, detectedBelong,detectedNotBelong,getDetectionTypes } = require('../service/detections')

// Add a value at sensor 
// POST /sensor/add
router.post('/increment', async (req, res) => {
    try {
        switch(req.query.type) {
            case "true_detection": await detectedTrue(); break;
            case "false_detection": await detectedFalse(); break;
            case "belong": await detectedBelong(); break;
            case "not_belong": await detectedNotBelong(); break;
            default: 
                res.status(404).end()
                return;
        }
        res.status(204).end();
    }catch(error) {
        console.error("There was an error while storing the detection");
        res.status(500);
    }
});

// retrieve all sensor values stored
// GET /detections
router.get('/', async (req, res) => {
    try{
        const detections = await getDetectionTypes();
        res.send(detections[0]).status(200);
    } catch(error) {
        console.error(error);
        res.status(500);
    }
});

module.exports = router;