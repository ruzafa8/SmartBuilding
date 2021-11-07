const query = require('./mysql');

const addElevator = floors => query(`INSERT INTO ELEVATOR (FLOORS) VALUES ('${JSON.stringify(floors)}');`);
const getElevator = id => query(`SELECT FLOORS FROM ELEVATOR WHERE ID = ${id}`);
const setOTP = (id, otp) => query(`UPDATE ELEVATOR SET OTP=${otp} WHERE ID=${id}`);
const getOTP = id => query(`SELECT OTP FROM ELEVATOR WHERE ID=${id}`);


module.exports = {
    addElevator, getElevator, setOTP, getOTP
}