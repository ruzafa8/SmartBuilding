import sys
import requests
import json

# GLOBAL VARIABLES
ACP_NAME = "MYACP"
CSE_URL = "192.168.0.21:7579"
CSE_NAME = "Mobius"
CSE_RELEASE = 3


ty = {
  "ACP": 1,
  "AE": 2,
  "CNT": 3,
  "CI": 4,
  "SUB": 23,
}


#HTTP requests handled here
def requestCSE (url, ty, body, originator):

    Headers = {
      "Content-Type": "application/json;ty={}".format(ty),
      "X-M2M-Origin": originator,
      "X-M2M-RVI": "{}".format(CSE_RELEASE),
      "X-M2M-RI": "req0",
      'Connection': "close"
    }

    if not body:
      body= None
    else:
      body = json.dumps(body)

    r = requests.post('http://{}/{}{}'.format(CSE_URL, CSE_NAME, url), headers=Headers, data=body)
    return r


#Create AE function
def createAE(ae):
    return requestCSE("", ty["AE"], {
      "m2m:ae": {
        "api": "N.org.demo.{}".format(ae),
        "rn": ae,
        "srv": ["{}".format(CSE_RELEASE)],
        "rr": True,
      },
    }, 'C{}'.format(ae))


#Create ACP function
def createACP(ae, acp):
    return requestCSE("/{}".format(ae), ty["ACP"], {
      "m2m:acp": {
        "rn": acp,
        "pv": {
          "acr": [
            {
              "acor": ["all"],
              "acop": 63,
            },
          ],
        },
        "pvs": {
          "acr": [
            {
              "acor": ["all"],
              "acop": 63,
            },
          ],
        },
      },
    }, 'C{}'.format(ae))


#Create CNT function
def createCNT(ae, cnt):
    return requestCSE("/{}".format(ae), ty["CNT"], {
      "m2m:cnt": {
        "mni": 10, # Max number of instances
        "rn": cnt,
        "acpi": ["{}/{}/{}".format(CSE_NAME, ae, ACP_NAME)],
      },
    }, 'C{}'.format(ae))


#Create CI function
def createCI(ae, cnt, ciContent):
    return requestCSE("/{}/{}".format(ae, cnt), ty["CI"], {"m2m:cin": {'con': ciContent}}, 'C{}'.format(ae))


#Create SUB function
def createSUB(subscriptor, broadcaster, container):
    return requestCSE("/{}/{}".format(broadcaster, container), ty["SUB"], {
      "m2m:sub": {
        "rn": "SUB_{}".format(subscriptor),
        "nu": ["mqtt://{}/C{}?ct=json".format(CSE_NAME, subscriptor)],
        "enc": {
          "net": [3],
        },
      },
    }, 'C{}'.format(subscriptor))
