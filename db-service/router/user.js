var express = require('express');
var router = express.Router();
const { signIn, checkPlate, logIn, acceptPlate } = require('../service/user')

router.get('/signin', function(req, res) {
});

router.post("/check", (req, res) => {
    res.send(JSON.stringify({belongs:checkPlate(req.body.plate)})).status(200);
})

module.exports = router;