import sys
import requests
import json

#AE_NAME = "LicensePlateRecog"
ACP_NAME = "MYACP"
CSE_URL = "127.0.0.1:7579"
CSE_NAME = "Mobius"
CSE_RELEASE = 3

ty = {
  "ACP": 1,
  "AE": 2,
  "CNT": 3,
  "CI": 4,
  "SUB": 23,
}


#HTTP requests handeled here
def requestCSE (url, ty, body, callback, originator):

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
    callback(r)


#Create CI function
def createAE(ae, callback):
    requestCSE("", ty["AE"], {
      "m2m:ae": {
        "api": "N.org.demo.{}".format(ae),
        "rn": ae,
        "srv": ["{}".format(CSE_RELEASE)],
        "rr": True,
      },
    }, callback, 'C{}'.format(ae))

#Create CI function
def createACP(ae, acp, callback):
    requestCSE("/{}".format(ae), ty["ACP"], {
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
    }, callback, 'C{}'.format(ae))

#Create CI function
def createCNT(ae, cnt, callback):
    requestCSE("/{}".format(ae), ty["CNT"], {
      "m2m:cnt": {
        "mni": 10, # Max number of instances
        "rn": cnt,
        "acpi": ["{CSE_NAME}/{ae}/{ACP_NAME}".format(CSE_NAME, ae, ACP_NAME)],
      },
    }, callback, 'C{}'.format(ae))

#Create CI function
def createCI(ae, cnt, ciContent, callback):
    requestCSE("/{}/{}".format(ae, cnt), ty["CI"], {"m2m:cin": {'con': ciContent}}, callback, 'C{}'.format(ae))

#Create CI function
def createSUB(subscriptor, broadcaster, container, callback):
    requestCSE("/{}/{}".format(broadcaster, container), ty["SUB"], {
      "m2m:sub": {
        "rn": "SUB_{}".format(subscriptor),
        "nu": ["mqtt://{}/{}?ct=json".format(CSE_NAME, subscriptor)],
        "enc": {
          "net": [3],
        },
      },
    }, callback, 'C{}'.format(subscriptor))

sys.modules = {createAE, createACP, createCNT, createCI, createSUB}