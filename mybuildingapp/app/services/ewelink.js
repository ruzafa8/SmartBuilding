// const ewelink = require("ewelink-api");

// let emailS;
// let passS;

// /* instantiate class */
// const connection = (email, pass) => {
//   try {
//     emailS = email;
//     passS = pass;

//     return new ewelink({
//       email: email,
//       password: pass,
//     });
//   } catch {
//     emailS = null;
//     passS = null;
//     return false;
//   }
// };

// const logIn = async (email, pass) => {
//   /* get all devices */
//   const devices = await connection(email, pass).getDevices();
//   return devices;
// };

// const getDevices = async () => {
//   try {
//     const devices = await connection(emailS, passS).getDevices();
//     console.log(devices);
//     return devices;
//   } catch {
//     return false;
//   }
// };

// const action = async (device, status) => {
//   const act = await connection.setDevicePowerState(device, status);
//   jsonP = JSON.parse(act);
//   if (jsonP["status"] === "ok") {
//     return true;
//   }

//   return false;
// };

// export { logIn, getDevices, action };
