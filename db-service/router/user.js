var express = require('express');
const router = express.Router();
const { signIn, checkPlate, logIn, listUsers, userUpdate, userDelete } = require('../service/user')

router.post('/signin', express.json(), function(req, res) {
    try {
        signIn(req.body.username, req.body.plate, req.body.password);
        res.status(200).end();
    } catch(error) {
        res.send(500);
    }
});

router.post("/check", express.json(),async(req, res) => {
    try {   
        res.send(JSON.stringify(await checkPlate(req.body.plate))).status(200);
    } catch(error) {
        res.send(500);
    }
});

router.post('/login', (req, res) => {});

router.get("/", async (req, res) => {
    try {
        const list = await listUsers();
        res.status(200).send(list);
    } catch(error) {
        res.status(500);
    }

});

router.patch("/:id", express.json(), async (req, res) => {
    try {
        const id = req.params.id;
        const verified = req.body.verified;
        await userUpdate(id, verified)
        res.status(204).end();
    } catch(error) {
        res.status(500);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await userDelete(id)
        res.status(204).end();
    } catch(error) {
        res.status(500);
    }
});

module.exports = router;