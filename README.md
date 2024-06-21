# Smart Building using oneM2M Protocol

## Overview

This project demonstrates the implementation of a smart building system using the oneM2M protocol. It features a smart parking door and an IoT-enabled elevator, coordinated to enhance user convenience and automation.

This project was created for a hackathon at the Korea Electronics Technology Institute (KETI), part of the South Korea University of Technology, and won the award for Best Device Integration and Innovation.

For more detailed instructions to replicate this project, go to https://www.hackster.io/wsw/smart-building-using-onem2m-protocol-c2e7a9

## Features

- **Smart Parking System**: Automatically opens the parking door upon detecting the user's vehicle.
- **IoT Elevator**: Prepares the elevator for the user as they arrive, streamlining their entry process.
- **Home Automation Integration**: Activates home devices like lights and coffee machines upon user arrival.

## Components

### Hardware

- 5 mm LEDs (Red, Yellow, Green)
- Digilent Stepper Motors
- Arduino ULN2003 Driver Modules
- Ultrasonic Sensors (HC-SR04)
- NodeMCU ESP8266 Boards
- Adafruit RGB Backlight LCD (16x2)
- Raspberry Pi 3 Model B
- Raspberry Pi Camera Module V2
- Breadboards
- Anycubic i3 Mega 3D Printer

### Software

- Mobius (oneM2M implementation)
- NodeJS
- MySQL Server
- MQTT
- Python

## Installation and Setup

### Prerequisites

- NodeJS
- MySQL Server
- MQTT Broker

### Setting Up Mobius

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/ruzafa8/SmartBuilding.git
    cd SmartBuilding
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Configure MySQL**:
    - Create a database and user for Mobius.
    - Update the configuration file with the MySQL credentials.

4. **Run Mobius**:
    ```bash
    node mobius.js
    ```

### Setting Up the Hardware Components

1. **Proximity Sensor**:
    - Connect the HC-SR04 sensor to the NodeMCU.
    - Upload the provided Arduino sketch using the NewPing library.
    
    ```cpp
    // Example setup code for proximity sensor
    void init_ProximitySensor(){
        String desc = "Name=ProximitySensor;Location=Parking;Desc=it publishes 'Detected' when detects something.";
        String initialData = "";
        originator = "CProximitySensor";
        bool isActuator = false;
        registerModule("ProximitySensor", isActuator, desc, initialData);
    }

    void setup() {
        Serial.begin(SERIAL_SPEED);
        init_WiFi();
        init_ProximitySensor();
    }
    ```

2. **Camera Module**:
    - Attach the camera to the Raspberry Pi.
    - Install the PiCamera Python library and Apache server.
    
    ```python
    from picamera import PiCamera
    import requests
    
    camera = PiCamera()
    camera.capture('/path/to/image.jpg')
    ```

3. **License Plate Recognition**:
    - Set up a neural network for number-plate recognition.
    - Use the provided Python scripts to process images and detect license plates.
    
    ```python
    import requests
    response = requests.get(image_url)
    # Process the image and recognize license plates
    ```

4. **Elevator and Other Actuators**:
    - Connect and configure stepper motors, LEDs, and other components as per the provided circuit diagrams and code snippets.


### Compounding AEs

- [ProximitySensor](./proximitySensorAE/)  
- [Camera](./cameraAE/)
- [License Plate Recognition AE](./licensePlateRecognitionAE/)
- Building
- Elevator
- Semaphore
- ParkingDoor
- BuildingApp
- [Monitor](./MonitorAE/)


## Running the Project

1. **Start the Mobius Server**:
    ```bash
    node mobius.js
    ```

2. **Deploy the IoT Devices**:
    - Ensure all sensors and actuators are correctly connected and programmed.
    - Start the Python scripts and Arduino sketches on respective devices.

3. **Access the Application**:
    - Use the mobile app or web interface to interact with the smart building system.
    - Monitor real-time data and control devices through the provided front-end.


