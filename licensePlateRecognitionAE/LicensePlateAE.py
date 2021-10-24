import paho.mqtt.client as mqtt
import json
import requests
import io
import os

from requests.api import head
import ANPRnoRestart as ANPR

AE_NAME = "LicensePlateRecog"
CSE_URL = "127.0.0.1:7579"
CSE_NAME = "Mobius"
CSE_RELEASE = 3

DOWNLOADED_IMAGE_PATH = "./DownloadedImage"



def requestCSE (url, ty, body, callback, originator ):

    Headers = {
      "Content-Type": "application/json;ty={}".format(ty),
      "X-M2M-Origin": originator,
      "X-M2M-RVI": "{}".format(CSE_RELEASE),
      "X-M2M-RI": "req0",
      'Connection': "close"
    }

    r = requests.post('http://{}/{}{}'.format(CSE_URL, CSE_NAME, url), headers=Headers, data=json.dumps(body))
    callback(r)

def createCI(ae, cnt, ciContent, callback):
    requestCSE("/{}/{}".format(ae, cnt), 4, {"m2m:cin": {'con': ciContent}}, callback, 'C{}'.format(ae))



ANPR.runDetection(export=False)

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("/oneM2M/req/Mobius2/Command/json")


def sayHi(r):
    print(r)

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    message = msg.payload
    jsonP = json.loads(message)

    try:
        con = jsonP["pc"]["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]
        if con:
            print(con)
            response = requests.get(con)
            if not os.path.isdir(DOWNLOADED_IMAGE_PATH):
                os.mkdir(DOWNLOADED_IMAGE_PATH)
            file = open("{}/image.jpg".format(DOWNLOADED_IMAGE_PATH), "wb")
            file.write(response.content)
            file.close()
            numberPlate = ANPR.runDetection("{}/image.jpg".format(DOWNLOADED_IMAGE_PATH), export=False)
            if numberPlate != False:
                print(numberPlate[0])
                createCI(AE_NAME, "DATA_license", numberPlate[0], sayHi)
            else:
                createCI(AE_NAME, "DATA_license", "none", sayHi)

        else:
            print("No data received")
    except:
        print("Error ocurred or con not existant")


    #print(msg.topic+" "+str(msg.payload))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883, 60)

client.loop_forever()