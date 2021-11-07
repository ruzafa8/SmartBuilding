const { addElevator, getElevator, getOTP, setOTP} = require('../model/elevator')

const add = floor => addElevator(floor).then(JSON.stringify).then(JSON.parse);
const get = id => getElevator(id).then(JSON.stringify).then(JSON.parse);
const checkOTP = (id, otp) =>getOTP(id)
        .then(JSON.stringify)
        .then(JSON.parse)
        .then(({OTP}) =>  OTP === otp);
const changeOTP = (id, otp) => setOTP(id,otp);

module.exports = {
    add, get, checkOTP, setOTP, changeOTP
}