require('dotenv').config();

module.exports = {
    descContainerName: process.env.DESC_CNT_NAME,
    dataContainerName: process.env.DATA_CNT_NAME,
    commandContainerName:process.env.CMND_CNT_NAME,
    ACP_NAME: process.env.ACP_NAME,
    CSE_RELEASE: process.env.CSE_RELEASE,
    CSE_NAME: process.env.CSE_NAME,
    CSE_URL: process.env.CSE_URL,
    CSE_PATH: process.env.CSE_PATH,
    AE_NAME: process.env.AE_NAME,
}

