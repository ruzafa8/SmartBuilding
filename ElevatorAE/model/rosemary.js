const fetch = require('node-fetch');
const ACP_NAME = "MYACP";
const CSE_RELEASE = 3;
const CSE_NAME = "Rosemary";
const CSE_URL = "rosemary";
const ENDPOINT = `http://${CSE_URL}`;
const ty = {
    ACP:1, AE: 2, CNT:3, CI:4, SUB: 23
}

let req = 0;
const getReq = () => ++req;

const fetchCSE = (url, ty, body, originator) => fetch(`${ENDPOINT}/${CSE_NAME}${url}`, {
    method: 'POST',
    headers: {
        'Content-Type': `application/json;ty=${ty}`,
        'X-M2M-Origin':originator,
        'X-M2M-RVI': CSE_RELEASE,
        'X-M2M-RI': `req${getReq()}`,
        'Connection': 'close'
    }, 
    body: body ? JSON.stringify(body) : null
}).then(response => {
    if (!response.ok) throw response;
}).catch(console.log);

const createAE = ae => fetchCSE('',ty.AE,{
        'm2m:ae': {
            'api': `N.org.demo.${ae}`,
            'rn': ae,
            'srv':[`${CSE_RELEASE}`],
            'rr':true, 
            //'poa': [`${MY_IP}/${ae}`]
        }
    }, `C${ae}`).then(() => console.log(`AE ${ae} created!`));


const createACP = (ae, acp) => fetchCSE(`/${ae}`, ty.ACP, {
        'm2m:acp': {
            'rn': acp,
            'pv': {
                'acr': [{
                    'acor': ['all'],
                    'acop':63
                }]
            },
            'pvs': {
                'acr': [{
                    'acor': ['all'],
                    'acop': 63
                }]
            }
        }
    }, `C${ae}`).then(() => console.log(`ACP ${ae} created!`));


const createCNT = (ae, cnt) => fetchCSE(`/${ae}`, ty.CNT, {
        'm2m:cnt': {
            'mni':10, // Max number of instances
            'rn': cnt,
            'acpi':[`${CSE_NAME}/${ae}/${ACP_NAME}`]
        }
    }, `C${ae}`).then(() => console.log(`CNT ${ae}/${cnt} created!`));


const createCI = (ae, cnt, ciContent) => fetchCSE(`/${ae}/${cnt}`,ty.CI, {
        'm2m:cin': {
            'con': ciContent
        }
    }, `C${ae}`)
    .then(() => console.log(`CI ${ae}/${cnt} with cin=${ciContent} created!`))


const createSUB = (subscriptor, broadcaster, container) => fetchCSE(`/${broadcaster}/${container}`, ty.SUB, {
        'm2m:sub': {
            'rn': `SUB_${subscriptor}`,
            'nu': [`mqtt://${CSE_NAME}/${subscriptor}?ct=json`],
            'enc': {
                'net':[3]
            }
        }
    }, `C${subscriptor}`).then(() =>
    console.log("SUB " + broadcaster + "/" + container + "/SUB_" + subscriptor + " created !"));


module.exports = {
    createAE, createCNT, createCI, createSUB, createACP
}