[back](https://github.com/ruzafa8/SmartBuilding)
# Monitor AE
## Introduction
This AE contains the business logic of the system. It is subscribed to all the AEs which publishes  data and it is the resposible to trigger the actuators if necessary.

# How to deploy it

## Requeriments
1. Node
2. Mobius
3. MySQL Server
4. mqtt server

## Software set up
At .env file you can specify the CSE, mqtt and database's endpoint.

You need to install the dependencies of this AE. To do that, you have to run this command in a terminal: `npm install`.

Then you can start the AE: `node ./index.js`

