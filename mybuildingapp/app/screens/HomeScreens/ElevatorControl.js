import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";
import colors from "../../colors/colors";
import execWS from "../../services/wsConnection";

const fontSize = (font) => {
  return Platform.OS == "ios" ? font + 8 : font;
};

const Floors = [2, 1, 0]

const changeFloor = (f) => {
  execWS(6, {floorNumber: f}).then((r) => {
    if (JSON.parse(r.data).return){
      showMessage({
        message: "Elevator called",
        description: "I'll go down in a sec",
        type: "success",
      });
    }
  })
}

const ElevatorControl = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.textUPView}>
        <Text style={styles.textUP}>Select the floor: </Text>
      </View>
      <View style={styles.floorView}>
        {Floors.map((i, index) => (
        <TouchableOpacity style={styles.floorBtn} onPress={() => changeFloor(i)} key={index}>
            <Text style={styles.floorText}>{i}</Text>
        </TouchableOpacity>))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
mainView: {flex: 1, },
textUPView: {flex: 0.2, alignItems: "center", justifyContent: "center"},
textUP: {fontFamily: "NewYork", fontSize: fontSize(30)},
floorView: {flex: 0.8, justifyContent: "center", alignItems: "center"},
floorBtn: {backgroundColor: colors.p_dark, borderRadius: 25, height: 100, width: 100, alignItems: "center", justifyContent: "center", margin: 20},
floorText: {fontFamily: "NewYork", fontSize: fontSize(20)}
})

export default ElevatorControl;
