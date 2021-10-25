var express = require('express');
var router = express.Router();
const { signIn, checkPlate, logIn, acceptPlate } = require('../service/user')

// respond with "hello world" when a GET request is made to the homepage
router.get('/signin', function(req, res) {
});

module.exports = router;