const WebSocketServer = require("ws").Server;
const model = require('../models/cse')
const ewelinkAPI = require("ewelink-api");

const mysql = require("mysql");
const port = 8080;

const wss = new WebSocketServer({ port: port });
console.log("[INFO] WebSocket Server started, port: " + port);

var con = mysql.createConnection({
  host: "192.168.31.214",
  port: 3306,
  user: "myBuilding",
  password: "123",
  database: "building",
});

const mqtt = require('mqtt')
let client  = mqtt.connect('mqtt://192.168.31.214')
client.on('connect', () => {
  client.subscribe('/oneM2M/req/Mobius2/MobileApp/json');
  client.on('message', (topic, message) => {
      let data = JSON.parse(message)["pc"]["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]
      console.log("[INFO] OneM2M Received")
      if (data != undefined){
        console.log("[INFO] Data received")
        con.query(`SELECT * FROM USER WHERE USER.id='${data}'`, (err, m) => {
          //console.log(m[0].Username)
          const data = m[0]
          if (data.Ewelink == 1 && data.verified == 1){
            // console.log(data.Ewpassword)
            const connect = new ewelinkAPI({
              email: data.Ewemail,
              password: data.Ewpassword,
            });
            const devicesONData = JSON.parse(data.devicesON)
            let devices2On = []
            for (let i = 0; i < devicesONData.n; i++){
              // console.log(Object.keys(devicesONData.data)[i])
              if (devicesONData.data[Object.keys(devicesONData.data)[i]] == 1){
                devices2On.push(Object.keys(devicesONData.data)[i])

              }
            }
            console.log(devices2On)
            if (devices2On != ""){
              for (let i = 0; i < devices2On.length; i++){
                connect.setDevicePowerState(devices2On[i], 'on')
              }
            }

          }
        })
      }
  })
})

const {dataContainerName, descContainerName, commandContainerName, ACP_NAME} = require('../config/cse');

const registerModule = (module, isActuator, intialDescription, initialData) => 
    model.createAE(module)  // 1. Create the ApplicationEntity (AE) for this sensor
        .then(() => model.createACP(module, ACP_NAME))
        .then(() => model.createCNT(module, descContainerName)) // 2. Create a first container (CNT) to store the description(s) of the sensor
        .then(() => model.createCI(module, descContainerName, intialDescription)) // Create a first description under this container in the form of a ContentInstance (CI)
        .then(() => model.createCNT(module, dataContainerName)) // 3. Create a second container (CNT) to store the data  of the sensor
        .then(() => model.createCI(module, dataContainerName, initialData)) 
        .then(() => {
            if (isActuator) // 4. if the module is an actuator, create a third container (CNT) to store the received commands
                return model.createCNT(module, commandContainerName)
                    .then(() => model.createSUB(module, module, commandContainerName));
                        // subscribe to any command put in this container
        });

registerModule('MobileApp', true, 'Mobile app for controlling elevator and ewelink devices', '')


wss.on("connection", function connection(ws) {
  //ws.send(connectionStablished);
  ws.on("message", function incoming(message) {
    parseIncomming(message)
      .then((output) => {
        //console.log(output);
        ws.send(output);
      })
      .catch((e) => {
        console.log(e);
      });
  });
});

wss.on("close", (ws) => {
  console.log("[closed] Connection closed");
});

con.connect(function (error) {
  if (error) throw error;
  console.log("[INFO] Connected to DB");
});

function parseIncomming(m) {
  return new Promise((resolve, reject) => {
    console.log("Message received");

    try {
      let data = JSON.parse(m);
      let JsonReturn = {};

      switch (data.type) {
        case "login":
          console.log("[INFO] Login");
          let user = data.data.username;
          let password = data.data.password;

          let query = `SELECT * FROM USER WHERE (USER.verified = 1 AND USER.Username = '${user}' AND USER.Password = MD5('${password}'))`;

          con.query(query, function (err, result) {
            let data = result[0];
            if (result[0]) {
              console.log("[INFO] Coincidence found");
              let UId = data.id;
              let ewelinkA = data.Ewelink;

              if (ewelinkA) {
                console.log("[INFO] Ewelink linked");
                let Ewemail = data.Ewemail;
                let Ewpassword = data.Ewpassword;

                let returned = JSON.stringify({
                  return: true,
                  data: {
                    id: UId,
                    username: user,
                    ewelink: ewelinkA,
                    ewemail: Ewemail,
                    ewpassword: Ewpassword,
                  },
                });

                //console.log(returned);

                resolve(returned);
              } else {
                console.log("[INFO] Ewelink not linked");
                let returned = JSON.stringify({
                  return: true,
                  data: { id: UId, username: user, ewelink: ewelinkA },
                });
                //console.log(returned);
                resolve(returned);
              }
            } else {
              resolve(JSON.stringify({ return: false }));
            }
          });

          // if (user === "v" && password === "a") {
          //   console.log("[PASSWORD] Correct");
          //   JsonReturn = JSON.stringify({ return: true });
          // } else {
          //   console.log("[PASSWORD] Incorrect");
          //   JsonReturn = JSON.stringify({ return: false });
          // }

          //return JsonReturn;
          break;

        case "register":
          console.log("[INFO] Register");

          let userReg = data.data.username;
          let passwordReg = data.data.password;
          let licensePlate = data.data.licensePlate;
          let ewelinkReg = data.data.ewelink;
          let ewemailReg;
          let ewpasswordReg;

          if (ewelinkReg == 1) {
            ewemailReg = data.data.ewemail;
            ewpasswordReg = data.data.ewpassword;
          }
          //SEND TO DB
          con.query(
            `SELECT * FROM USER WHERE Username='${userReg}'`,
            (e, r) => {
              //console.log(r[0])
              if (r[0] != undefined) {
                resolve(JSON.stringify({ return: false }));
              } else {
                let regQuery;
                if (ewelinkReg == 1)
                  regQuery = `INSERT INTO USER (Username, Password, LicensePlate, Ewelink, Ewemail, Ewpassword, devicesON) VALUES ('${userReg}', MD5('${passwordReg}'),'${licensePlate.replace(/\s/g, '')}', 1,'${ewemailReg}','${ewpasswordReg}', 'change')`;
                else
                  regQuery = `INSERT INTO USER(Username, Password, LicensePlate, Ewelink, devicesON) VALUES ('${userReg}', MD5('${passwordReg}'),'${licensePlate.replace(/\s/g, '')}', 0, 'change')`;
                con.query(regQuery, (err, r2) => {
                  if (r2.affectedRows == 1) {
                    resolve(JSON.stringify({ return: true }));
                  } else {
                    resolve(JSON.stringify({ return: false }));
                  }
                });
              }
            }
          );

          break;

        case "set":
          console.log("[INFO] UPDATING DEVICES");
          let array = data.devicesON;
          let ewemailChange = data.ewemailChange;
          //console.log(array);
          const updateQuery = `UPDATE \`USER\` SET USER.devicesON='${array}' WHERE USER.Ewemail = '${ewemailChange}';`;
          con.query(updateQuery, (e, r) => {
            //console.log(r.affectedRows);
            if (r.affectedRows == 1) {
              resolve(JSON.stringify({ return: true }));
            } else {
              resolve(JSON.stringify({ return: false }));
            }
          });

          break;
        case "logged":
          console.log("[INFO] Checking logged");
          let id = data.data.id._W;
          console.log("ID IS: " + id);

          if (!id) {
            console.log("[INFO] DON'T HAVE ID NUMBER");
            JsonReturn = JSON.stringify({ return: false });
          } else {
            console.log("[INFO] HAS ID NUMBER");
            let queryCheckLogged = `SELECT * FROM USER WHERE (USER.verified=1 AND USER.id='${id}')`;

            con.query(queryCheckLogged, (err, result) => {
              console.log(result);
              if (result[0] != null) {
                console.log("[LOGGED] Confirmed");
                resolve(JSON.stringify({ return: true }));
              } else {
                console.log("[LOGGED] Not confirmed");
                resolve(JSON.stringify({ return: false }));
              }
            });
          }
          break;

        case "getDevices":
          console.log("[INFO] Getting devices");

          if (data.data.ewemail && data.data.ewpassword) {
            //console.log(data.data.ewemail);
            const ewelinkExec = async () => {
              const connect = new ewelinkAPI({
                email: data.data.ewemail,
                password: data.data.ewpassword,
              });

              //DEVICES IS AN ARRAY
              const devices = await connect.getDevices();

              const deviceQuery = `SELECT devicesON FROM USER WHERE (USER.Ewemail='${data.data.ewemail}' AND USER.verified='1')`;

              con.query(deviceQuery, (e, r) => {
                //console.log(r[0].devicesON);
                const devicesON = r[0].devicesON;

                if (devicesON == "change") {
                  console.log("DEVICES NOT SETUP");
                  const dLength = Object.keys(devices).length;
                  let setDevices;
                  for (let i = 0; i < dLength; i++) {
                    if (i == 0) {
                      setDevices = { n: dLength, data: {} };

                      setDevices["data"][devices[i].deviceid] = 0;
                    } else {
                      //let data = JSON.parse(setDevices);
                      setDevices["data"][devices[i].deviceid] = 0;
                    }
                  }
                  console.log(JSON.stringify(setDevices));
                  const loadNewDevicesON = `UPDATE \`USER\` SET USER.devicesON='${JSON.stringify(
                    setDevices
                  )}' WHERE USER.Ewemail='${data.data.ewemail}';`;
                  con.query(loadNewDevicesON, (e, r) => {});
                  const returThisTime = {
                    return: "getDevices",
                    data: { devices },
                    devicesON: JSON.stringify(setDevices),
                  };
                  resolve(JSON.stringify(returThisTime));
                } else {
                  const returThisTime = {
                    return: "getDevices",
                    data: { devices },
                    devicesON: devicesON,
                  };
                  //console.log(returThisTime);
                  resolve(JSON.stringify(returThisTime));
                }
              });
              //console.log(devices[0]);
            };
            ewelinkExec();
          } else {
          }
          break; 

        case "setFloor":
          const floor = data.floorNumber;
          //module.createCI('ElevatorAE', 'COMMAND', floor)
          resolve(JSON.stringify({return: true}))
          break;
      }
    } catch (e) {
      //console.log(e);
      let errorMsg = JSON.stringify({ error: "invalid input" });
      return errorMsg;
    }
  });
}
