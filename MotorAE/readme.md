[back](https://github.com/ruzafa8/SmartBuilding)
# MOTOR AE
## Description
Is the motor 
# How to deploy it

## Requeriments
1. An Arduino module (In our case we use a NodeMCU)
2. ESP8266 Wifi module
3. 1 Stepper motor 28byj-48
4. 1 ULN2003 Driver Module

## Hardware set up
![Breadboard schematics](/semaphoreAE/motor_schematic.jpg)

## Software set up
You must change the value of these variables to those of your devices and services:

WIFI_SSID      // Configure here the SSID of your WiFi Network

WIFI_PSWD      // Configure here the password of your WiFi Network

mqtt_server    // ip of your mqtt server

CSE_IP         // Configure here the IP Address of your oneM2M CSE

CSE_HTTP_PORT  // Configure here the port of your oneM2M CSE

CSE_NAME       // Configure here the name of your oneM2M CSE