const jwt = require("jsonwebtoken");
const {accessToken} = require('../config/token');

const sign = obj => jwt.sign(obj, accessToken);
const verify = (token, callback) => jwt.verify(token,accessToken,callback);

module.exports = { sign, verify };