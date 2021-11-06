import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// AsyncStorage.removeItem("id");

import colors from "../../colors/colors";

const fontSize = (font) => {
  return Platform.OS == "ios" ? font + 8 : font;
};

function HomeScreen({ navigation }) {
  const [username, setUser] = useState();
  const GetUsername = async () => {
    setUser(await AsyncStorage.getItem("username"));
    //console.log(username);
  };
  GetUsername();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view1}>
        <Text style={styles.view1Text}>Welcome, {username}</Text>
        <Text style={styles.view1OptionsText}>
          Click the upper-left icon to see the options
        </Text>
      </View>
      <View style={styles.view2}>
        <TouchableOpacity
          style={styles.logOutBtn}
          onPress={() => {
            console.log("[INFO] Client logged out");
            AsyncStorage.setItem("id", `0`);
            AsyncStorage.multiRemove([
              "username",
              "password",
              "ewelink",
              "ewemail",
              "ewpassword",
            ]);
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.logOutBtnText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, alignItems: "center" },
  view1: {
    flex: 0.45,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  view1Text: {
    fontFamily: "NewYork",
    fontSize: fontSize(35),
    marginBottom: 20,
  },
  view1OptionsText: {
    fontFamily: "NewYork",
    fontSize: fontSize(20),
  },
  view2: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  view2View: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "red",
  },
  view2Text: { fontFamily: "NewYork", fontSize: 20 },
  welcomText: { fontFamily: "NewYork", fontSize: 30 },
  logOutBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  logOutBtnText: {
    fontFamily: "NewYork",
    fontSize: fontSize(20),
  },
  connectionText: {
    fontFamily: "NewYork",
    fontSize: fontSize(20),
  },
});

export default HomeScreen;
