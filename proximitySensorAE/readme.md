[back](https://github.com/ruzafa8/SmartBuilding)
# Proximity Sensor AE
## Description
Is the proximity sensor that detects if there is a car that wants to enter through the parking door, if it detects something, it notifies the camera to take a picture of the front of the car.

# How to deploy it

## Requeriments
1. An Arduino module (In our case we use a NodeMCU, which has the ESP8266 Wifi module)
2. A proximity sensor module HC-SR04

## Hardware set up
![Breadboard schematics](/proximitySensorAE/proximitySensor_schematic.png)

## Software set up
You must change the value of these variables to those of your devices and services:

WIFI_SSID      // Configure here the SSID of your WiFi Network
WIFI_PSWD      // Configure here the password of your WiFi Network

mqtt_server    // ip of your mqtt server
CSE_IP         // Configure here the IP Address of your oneM2M CSE
CSE_HTTP_PORT  // Configure here the port of your oneM2M CSE
CSE_NAME       // Configure here the name of your oneM2M CSE
