const express = require('express');
const router = express.Router();
const {add, get, checkOTP} = require('../service/elevator')
const rosemary = require('./service/rosemary')

// Add an elevator resource
// POST /elevator/add
router.post('/add',express.json(), async (req, res) => {
    try {
        const floors = req.body.floors;
        if(!req.body.floors) {
            res.send(400);
        } else {
            const r = await add(floors);
            res.send({id:r.insertId}).status(200);
        }
    }catch(error) {
        res.status(500);
    }
});

// retrieve a elevator by its id
// GET /detections
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const r = await get(id);
        if(r.length === 0){
            console.error(`ID ${id} does not exists`);
            res.status(404).end();
        } else {
            res.send({floors:JSON.parse(r[0].FLOORS)}).status(200);
        }
    } catch(error) {
        console.error(error);
        res.status(500);
    }
});

router.post("/:id/check-otp", express.json(), async (req, res) =>{
    try {
        const id = req.params.id;
        const otp = req.body.otp;
        const currentFloor = req.body.currentFloor;
        const r = await checkOTP(id, otp);
        if(r) {
            rosemary.instanciate("Elevator_Motor", "COMMAND", currentFloor);
            rosemary.instanciate("Elevator_Screen", "COMMAND","correct_password")
        } else {
            rosemary.instanciate("Elevator_Screen", "COMMAND","incorrect_password")
        }
        res.send({correct:r}).status(200);
    } catch(error) {
        console.error(error);
        res.status(500);
    }
})

router.post("/:id/go-to", express.json(), async (req, res) =>{
    try {
        const id = req.params.id;
        const desiredFloor = req.body.desiredFloor;
        rosemary.instanciate("Elevator_Motor", "COMMAND", desiredFloor);
        res.status(204).end();
    } catch(error) {
        console.error(error);
        res.status(500);
    }
})

module.exports = router;