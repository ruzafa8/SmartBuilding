require('dotenv').config();

module.exports = {
    descContainerName: "DESCRIPTOR",
    dataContainerName: "DATA",
    commandContainerName: "COMMAND",
    ACP_NAME: "MYACP",
    CSE_RELEASE: 3,
    CSE_NAME: "Mobius",
    CSE_URL: "192.168.31.214:7579",
    CSE_PATH: "Mobius2",
    AE_NAME: process.env.AE_NAME,
}

