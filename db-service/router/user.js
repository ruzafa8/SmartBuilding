var express = require('express');
var router = express.Router();
const { signIn, checkPlate, logIn, acceptPlate } = require('../service/user')

router.get('/signin', function(req, res) {
});

module.exports = router;