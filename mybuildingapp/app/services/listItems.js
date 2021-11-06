import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import execWS from "./wsConnection";

import CheckboxList from "rn-checkbox-list";
import ConnectingScreen from "../screens/connectingScreen";
import DeviceTab from "../components/deviceTab";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";

const fontSize = (font) => {
  return Platform.OS == "ios" ? font + 8 : font;
};

const ListItems = () => {
  const [show, setShow] = useState(false);
  const [devicesNames, setDevicesNames] = useState([]);
  const devicesNamesNotState = [];
  const [devicesONArray, setDevicesON] = useState([]);
  let selectedDevices;

  const getDevices = async () => {
    let ewelinkValue = await AsyncStorage.getItem("ewelink");
    console.log("[INFO] Trying to get devices");
    if (ewelinkValue == 1) {
      let username = await AsyncStorage.getItem("ewemail");
      let password = await AsyncStorage.getItem("ewpassword");
      return new Promise((resolve, reject) => {
        execWS(4, { ewemail: username, ewpassword: password }).then(
          (devices) => {
            //console.log(devices[0]);
            resolve(devices);
          }
        );
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    getDevices().then((d) => {
      const lenght = Object.keys(d.data.devices).length;
      const devices = d;
      //console.log(devices);
      for (let i = 0; i < lenght; i++) {
        let jsonSend = {
          id: devices.data.devices[i].deviceid,
          name: devices.data.devices[i].name,
        };
        devicesNamesNotState.push(JSON.stringify(jsonSend));
      }
      setDevicesON(devices.devicesON);
      setDevicesNames(devicesNamesNotState);
      //console.log(devicesNames);
    });
  }, []);

  while (devicesNames.length == 0) {
    return (
      <View style={styles.mainView}>
        <Text>Loading</Text>
      </View>
    );
  }

  const changeDevicesOn = (device) => {
    console.log("[INFO] Changing device state");
    let currentValue = JSON.parse(devicesONArray);
    currentValue.data[device] = currentValue.data[device] == 1 ? 0 : 1;
    setDevicesON(JSON.stringify(currentValue));
  };

  const publicChanges = async () => {
    console.log("[INFO] SENDING CHANGES");
    let ewemail = await AsyncStorage.getItem("ewemail");
    execWS(5, { devicesON: devicesONArray, ewemail: ewemail }).then((r) => {
      //console.log(JSON.parse(r.data).return);
      const response = JSON.parse(r.data).return;
      if (response == true) {
        showMessage({
          message: "Successfully updated",
          description: "Changes have been changed successfully",
          type: "success",
        });
      } else {
        showMessage({
          message: "Something went wrong",
          description: "Either the server is offline or an error ocurred",
          type: "warning",
        });
      }
    });
  };
  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollView}>
        {devicesNames.map((device, index) => {
          const info = JSON.parse(device);

          return (
            <TouchableOpacity
              key={index}
              onPress={() => changeDevicesOn(info.id)}
            >
              <DeviceTab
                id={info.id}
                text={info.name}
                devicesON={JSON.stringify(
                  JSON.parse(devicesONArray).data[info.id]
                )}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.viewApply}>
        <View style={styles.anotherView}>
          <TouchableOpacity style={styles.applyBtn} onPress={publicChanges}>
            <Text style={styles.applyText}> APPLY </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: { flex: 0.9, width: "100%" },
  scrollView: { flex: 0.85, width: "100%" },
  viewApply: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  anotherView: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
  },
  applyBtn: {
    width: "100%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  applyText: {
    color: "black",
    fontSize: fontSize(20),
    fontFamily: "NewYork",
    fontWeight: "bold",
  },
});

export default ListItems;
