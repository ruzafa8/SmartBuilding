const WebSocketServer = require("ws").Server;

const ewelinkAPI = require("ewelink-api");

const mysql = require("mysql");

const port = 8080;

const wss = new WebSocketServer({ port: port });

console.log("[INFO] WebSocket Server started, port: " + port);

const connectionStablished = JSON.stringify({ connected: true });

var con = mysql.createConnection({
  host: "varohome.duckdns.org",
  port: 3443,
  user: "mobius",
  password: "mobius",
  database: "mobiusdb",
});

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

          let query = `SELECT * FROM USERS WHERE (USERS.verified = 1 AND USERS.Username = '${user}' AND USERS.Password = '${password}')`;

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
            `SELECT * FROM USERS WHERE Username='${userReg}'`,
            (e, r) => {
              if (r[0] != undefined) {
                resolve(JSON.stringify({ return: false }));
              } else {
                let regQuery;
                if (ewelinkReg)
                  regQuery = `INSERT INTO \`USERS\`(\`Username\`, \`Password\`, \`LicensePlate\`, \`Ewelink\`, \`Ewemail\`, \`Ewpassword\`) VALUES ('${userReg}','${passwordReg}','${licensePlate}', 1,'${ewemail}','${ewpassword}')`;
                else
                  regQuery = `INSERT INTO \`USERS\`(\`Username\`, \`Password\`, \`LicensePlate\`, \`Ewelink\`) VALUES (''${userReg}','${passwordReg}','${licensePlate}', 0)`;

                // con.query(regQuery, (err, r1) => {
                //   console.log(r1);
                //   // if (r2.affectedRows == 1) {
                //   //   resolve(JSON.stringify({ return: true }));
                //   // } else {
                //   //   resolve(JSON.stringify({ return: false }));
                //   // }
                // });

                // ME QUEDÉ AQUÍ QUE NO CONSEGUÍA HACER QUE INSERTARA
                con.query(
                  `INSERT INTO \`USERS\`(\`Username\`, \`Password\`, \`LicensePlate\`, \`Ewelink\`) VALUES (''${userReg}','${passwordReg}','${licensePlate}', 0)`,
                  (e, rw) => {
                    console.log(rw);
                  }
                );
              }
            }
          );

          break;

        case "set":
          console.log("[INFO] UPDATING DEVICES");
          let array = data.devicesON;
          //console.log(array);
          const updateQuery = `UPDATE \`USERS\` SET USERS.devicesON='${array}';`;
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
            let queryCheckLogged = `SELECT * FROM USERS WHERE (USERS.verified=1 AND USERS.id='${id}')`;

            con.query(queryCheckLogged, (err, result) => {
              //console.log(result);
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

              const deviceQuery = `SELECT devicesON FROM USERS WHERE (USERS.Ewemail='${data.data.ewemail}' AND USERS.verified='1')`;

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
                  const loadNewDevicesON = `UPDATE \`USERS\` SET USERS.devicesON='${JSON.stringify(
                    setDevices
                  )}';`;
                  con.query(loadNewDevicesON, (e, r) => {});
                  const returThisTime = {
                    return: "getDevices",
                    data: { devices },
                    devicesON: setDevices,
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
      }
    } catch (e) {
      //console.log(e);
      let errorMsg = JSON.stringify({ error: "invalid input" });
      return errorMsg;
    }
  });
}
