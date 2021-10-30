import paho.mqtt.client as mqtt
import json
import requests
import io
import os
import socket
import OneM2MProtoc as module

from requests.api import head
from time import sleep

from picamera import PiCamera


# GLOBAL VARIABLES
MQTT_PORT=1883
MQTT_IP="192.168.0.21"
ACP_NAME = "MYACP"
AE_NAME = "Camera"
DESCRIPTOR_CONTAINER="DESCRIPTOR"
description="This is a camera which takes pictures when receives Shoot command"
DATA_CONTAINER = "DATA"
COMMAND_CONTAINER = "COMMAND"
CSE_NAME = "Mobius"
CSE_RELEASE = 3

my_IP="192.168.0.30"

camera = PiCamera()
camera.resolution = (1024, 768)
camera.rotation=180
camera.exposure_mode="night"
camera.image_effect="denoise"

global_counter=0

IMAGE_PATH = "/var/www/html/"


# Function for creating the LicensePlateRecog AE with all its containers
def registerAE(ae, acp, cntDescription, description, cntData, cntCommand):
    
    module.createAE(ae)
    module.createACP(ae, acp)
    module.createCNT(ae, cntDescription)
    module.createCI(ae, cntDescription, description)
    module.createCNT(ae, cntData)
    module.createCNT(ae, cntCommand)
    module.createSUB(ae, ae, cntCommand)



# Creates AE entity and containers inside
registerAE(AE_NAME, ACP_NAME, DESCRIPTOR_CONTAINER, description, DATA_CONTAINER, COMMAND_CONTAINER)



# Function to execute when connected to MQTT
def on_connect(client, userdata, flags, rc):

    # Make shure that its connected (should return code 0)
    print("Connected with result code "+str(rc))

    # Subscribe to the corresponding topic
    client.subscribe("/oneM2M/req/Mobius2/Camera/json")



# The callback to handle an incoming message over MQTT
def on_message(client, userdata, msg):
    global global_counter
    # Processes the message and converts it into a json format
    message = msg.payload
    jsonP = json.loads(message)

    # Looks for the "con" property which contains the URL to the image
    try:
        con = jsonP["pc"]["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]
        if con=="Shoot":
            print(con)
            global_counter= (global_counter + 1) % 10
            print(global_counter)
            path_img=IMAGE_PATH+"{}.jpg".format(global_counter)
            print(path_img)
            camera.capture(path_img)
            print(path_img)
            
            module.createCI(AE_NAME, DATA_CONTAINER, "http://"+my_IP+"/{}.jpg".format(global_counter))
        else:
            print("No command received")

    # If there's no URL or an error ocurred during the detection or download, skip        
    except:
        print("Error ocurred or con not exist")


# MQTT initialization
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect(MQTT_IP, MQTT_PORT, 60)

client.loop_forever()