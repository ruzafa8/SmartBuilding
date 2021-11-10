import paho.mqtt.client as mqtt
import json
import requests
import io
import os

import OneM2MProtoc as module

import ANPRnoRestart as ANPR

# GLOBAL VARIABLES
ACP_NAME = "MYACP"
AE_NAME = "LicensePlateRecog"
DESCRIPTION = "Name=LicensePlateRecog;Location=Building;Desc=This is a neuronal network for number-plate recognition"
DESC_CONTAINER = "DESCRIPTOR"
DATA_CONTAINER = "DATA"
COMMAND_CONTAINER = "COMMAND"
CSE_URL = "localhost:7579"
CSE_NAME = "Mobius"
CSE_RELEASE = 3
MQTT_IP="localhost"
MQTT_PORT=1883

DOWNLOADED_IMAGE_PATH = "./DownloadedImage"

### Config the global variables in module
module.CSE_URL = CSE_URL
module.ACP_NAME = ACP_NAME


# Function for creating the LicensePlateRecog AE with all its containers
def registerAE(ae, isActuator, description):
    module.createAE(ae)
    module.createACP(ae, ACP_NAME)
    module.createCNT(ae, DESC_CONTAINER)
    module.createCI(ae, DESC_CONTAINER, description)
    module.createCNT(ae, DATA_CONTAINER)
    if isActuator:
        module.createCNT(ae, COMMAND_CONTAINER)
        module.createSUB(ae, ae, COMMAND_CONTAINER)



# Creates AE entity and containers inside
registerAE(AE_NAME, True, DESCRIPTION)

# Executes a null recognition to load all the drivers
ANPR.runDetection(export=False)


# Function to execute when connected to MQTT
def on_connect(client, userdata, flags, rc):

    # Make shure that its connected (should return code 0)
    print("Connected with result code "+str(rc))

    # Subscribe to the corresponding topic
    client.subscribe("/oneM2M/req/Mobius2/C{}/json".format(AE_NAME))



# The callback to handle an incoming message over MQTT
def on_message(client, userdata, msg):

    # Processes the message and converts it into a json format
    message = msg.payload
    jsonP = json.loads(message)

    # Proccess topic:
    topic = msg.topic.split("/")
    try:
        rqi = jsonP["rqi"]
    except:
        rqi = ''
    pload = json.dumps({"rsc":2001,"to":"","fr":"CLicensePlateRecog","rqi":rqi,"pc":''})
    client.publish("/oneM2M/resp/Mobius2/CLicensePlateRecog/json",payload=pload)

    # Looks for the "con" property which contains the URL to the image
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
            numberPlate = ANPR.runDetection("{}/image.jpg".format(DOWNLOADED_IMAGE_PATH), export=True)
            if numberPlate != False:
                print(numberPlate[0])
                module.createCI(AE_NAME, DATA_CONTAINER, numberPlate[0])
            else:
                module.createCI(AE_NAME, DATA_CONTAINER, "none")

        else:
            print("No data received")

    # If there's no URL or an error ocurred during the detection or download, skip        
    except:
        print("Error ocurred or con not existant")


# MQTT initialization
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect(MQTT_IP, MQTT_PORT, 60)

client.loop_forever()