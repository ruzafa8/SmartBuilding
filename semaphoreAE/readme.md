[back](https://github.com/ruzafa8/SmartBuilding)
# Semaphore AE
## Introduction
is the semaphore that indicates the access to the parking lot, if it is red it indicates that you cannot pass, either because the license plate has not been detected or because the license plate does not belong to an inhabitant of the building.
The light will be yellow while the license plate is being processed or when the garage door has not yet been fully opened, and will be green when it is safe to pass.
# How to deploy it

## Requeriments
1. An Arduino module (In our case we use a NodeMCU)
2. ESP8266 Wifi module
3. 1 red led
4. 1 yellow led
5. 1 green led

## Hardware set up
![Breadboard schematics](/semaphoreAE/semaphore_schematic.jpg)

## Software set up