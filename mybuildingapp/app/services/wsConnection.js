const IP = "ws://192.168.31.222:8080";

const PS = {
  checkLogin: 1,
  checkLogged: 2,
  registration: 3,
  getDevices: 4,
  updateConfig: 5,
};

function connect(ip = IP) {
  return new WebSocket(ip);
}

function execWS(
  type,
  data = {
    username: null,
    password: null,
    licensePlate: null,
    ewelink: null,
    ewemail: null,
    ewpassword: null,
    id: null,
    devicesON: null,
  }
) {
  return new Promise((resolve, reject) => {
    let ws;
    try {
      ws = connect();
    } catch (e) {
      return 109;
    }
    switch (type) {
      case PS.checkLogin:
        ws.onopen = () => {
          ws.send(
            JSON.stringify({
              type: "login",
              data: { username: data.username, password: data.password },
            })
          );
          ws.onmessage = (m) => {
            //console.log(m);
            let data = JSON.parse(m.data);
            console.log(data);
            resolve(data);
          };
        };
        break;
      case PS.checkLogged:
        ws.onopen = () => {
          ws.send(JSON.stringify({ type: "logged", data: { id: data.id } }));
          ws.onmessage = (m) => {
            let data = JSON.parse(m.data);
            if (data.return) {
              resolve(true);
            } else {
              resolve(false);
            }
          };
        };
        ws.onerror = () => {
          resolve("ERROR");
        };

        break;
      case PS.registration:
        console.log(data);
        ws.onopen = () => {
          if (data.ewelink == 1) {
            ws.send(
              JSON.stringify({
                type: "register",
                data: {
                  username: data.username,
                  password: data.password,
                  licensePlate: data.licensePlate,
                  ewelink: true,
                  ewemail: data.ewemail,
                  ewpassword: data.ewpassword,
                },
              })
            );
          } else {
            ws.send(
              JSON.stringify({
                type: "register",
                data: {
                  username: data.username,
                  password: data.password,
                  licensePlate: data.licensePlate,
                  ewelink: false,
                },
              })
            );
          }

          ws.onmessage = (m) => {
            let data = JSON.parse(m.data);
            resolve(data.return)
          };
        };
        break;

      case PS.getDevices:
        ws.onopen = () => {
          ws.send(
            JSON.stringify({
              type: "getDevices",
              data: {
                ewemail: data.ewemail,
                ewpassword: data.ewpassword,
              },
            })
          );
          ws.onmessage = (m) => {
            let data = JSON.parse(m.data);
            if (data.return == "getDevices") {
              resolve(data);
            }
          };
        };
        break;
      case PS.updateConfig:
        ws.onopen = () => {
          ws.send(
            JSON.stringify({
              type: "set",
              devicesON: data.devicesON,
              ewemailChange: data.ewemail
            })
          );
          ws.onmessage = (m) => {
            resolve(m);
          };
        };
        break;
    }
  });
}

export default execWS;
