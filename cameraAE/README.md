[back](https://github.com/ruzafa8/SmartBuilding)
# Proximity Sensor AE
## Description
Is the AE which makes a photo and provides a URL to access to it.

This implementation uses the picamera module which provides an interface to use a camera though a Raspberry.
# How to deploy it

## Requeriments
1. A Raspberry Pi
2. A Camera module compatible with raspberry

## Hardware set up
Connect the camera to the raspberry

## Software set up
1. You must connect the Raspberry to the internet
2. You must change the value of these variables to those of your devices and services:
```python
  MQTT_PORT=1883
  MQTT_IP="192.168.0.21"
  CSE_NAME = "Mobius"
 ```
3. Set up an image server, in our case we installed apache server, and stored the images in a folder to serve.
`my_IP="192.168.0.30"`
