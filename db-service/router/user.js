var express = require('express');
const router = express.Router();
const { signIn, checkPlate, logIn, acceptPlate, uncheckedListUsers } = require('../service/user')

router.post('/signin', function(req, res) {
});

router.post("/check", (req, res) => {
    res.send(JSON.stringify({belongs:checkPlate(req.body.plate)})).status(200);
});

router.post('/login', (req, res) => {

});

router.post('/admit', (req, res) => {

});

router.get("/unchecked", async (req, res) => {
    try {
        const list = await uncheckedListUsers();
        res.status(200).send(list);
    } catch(error) {
        res.status(500);
    }

})

module.exports = router;