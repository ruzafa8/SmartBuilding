const model = require('../models/cse');
const {dataContainerName, descContainerName, commandContainerName, ACP_NAME} = require('../config/cse');

const registerModule = (module, isActuator, intialDescription, initialData) => 
    model.createAE(module)  // 1. Create the ApplicationEntity (AE) for this sensor
        .then(() => model.createACP(module,ACP_NAME))
        .then(() => model.createCNT(module, descContainerName)) // 2. Create a first container (CNT) to store the description(s) of the sensor
        .then(() => model.createCI(module, descContainerName, intialDescription)) // Create a first description under this container in the form of a ContentInstance (CI)
        .then(() => model.createCNT(module, dataContainerName)) // 3. Create a second container (CNT) to store the data  of the sensor
        .then(() => model.createCI(module, dataContainerName, initialData)) 
        .then(() => {
            if (isActuator) // 4. if the module is an actuator, create a third container (CNT) to store the received commands
                return model.createCNT(module, commandContainerName)
                    .then(() => model.createSUB(module, module, commandContainerName));
                        // subscribe to any command put in this container
        });

const registerSubscription = (subscription, broadcaster, container) => 
    model.createSUB(subscription, broadcaster, container);


const instanciate = (ae, cnt, value) => 
    model.createCI(ae, cnt, value)

module.exports = {
    registerModule, registerSubscription, instanciate
}
