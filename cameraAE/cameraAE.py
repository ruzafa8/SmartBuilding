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
description="Name=Camera;Location=Parking;Desc=This is a camera which takes pictures when receives Shoot command"
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
def registerAE(ae, isActuator, description):
    
    module.createAE(ae)
    module.createACP(ae, ACP_NAME)
    module.createCNT(ae, DESCRIPTOR_CONTAINER)
    module.createCI(ae, DESCRIPTOR_CONTAINER, description)
    module.createCNT(ae, DATA_CONTAINER)
    if isActuator:
        module.createCNT(ae, COMMAND_CONTAINER)
        module.createSUB(ae, ae, COMMAND_CONTAINER)



# Creates AE entity and containers inside
registerAE(AE_NAME, True, description)



# Function to execute when connected to MQTT
def on_connect(client, userdata, flags, rc):

    # Make sure that its connected (should return code 0)
    print("Connected with result code "+str(rc))

    # Subscribe to the corresponding topic
    client.subscribe("/oneM2M/req/Mobius2/CCamera/json")



# The callback to handle an incoming message over MQTT
def on_message(client, userdata, msg):
    global global_counter

    # Processes the message and converts it into a json format
    message = msg.payload
    jsonP = json.loads(message)

    # Proccess topic:
    topic = msg.topic.split("/")
    try:
        rqi = jsonP["rqi"]
    except:
        rqi = ''
    pload = json.dumps("rsc":2001,"to":"","fr":"CCamera","rqi":rqi,"pc":'')
    client.publish("/oneM2M/resp/Mobius2/CCamera/json",payload=pload)

    # Looks for the "con" property which contains the URL to the image
    try:
        con = jsonP["pc"]["m2m:sgn"]["nev"]["rep"]["m2m:cin"]["con"]
        if con=="Shoot":
            global_counter= (global_counter + 1) % 10
            path_img=IMAGE_PATH+"{}.jpg".format(global_counter)
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