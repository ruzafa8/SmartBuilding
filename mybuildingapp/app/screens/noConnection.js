import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import execWS from "../services/wsConnection";

const fontSize = (font) => {
  return Platform.OS == "ios" ? font + 8 : font;
};

const NoConnectionScreen = ({ navigation }) => {
  const [changePage, setPage] = useState("ERROR");

  const check = async () => {
    console.log("[INFO] Checking logged");
    let id = await AsyncStorage.getItem("id");
    if (id != null) {
      console.log("[INFO] ID Saved, checking");
      execWS(2, { id: AsyncStorage.getItem("id") }).then(function (valid) {
        //console.log(valid);
        if (valid == true) {
          console.log("LOGGED TO HOME");
          setPage("HomeApp");
        } else if (valid === "ERROR") {
          console.log("SERVER OFFLINE");
          setPage("ERROR");
        } else {
          console.log("Not logged");
          setPage("Login");
        }
      });
    } else {
      console.log("No id assigned");
      execWS(2, { id: 0 }).then(function (valid) {
        console.log(valid);
        if (valid == true) {
          console.log("LOGGED TO HOME");
          setPage("HomeApp");
        } else if (valid === "ERROR") {
          console.log("SERVER OFFLINE");
          setPage("ERROR");
        } else {
          console.log("Not logged");
          setPage("Login");
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view1}>
        <Text style={styles.connectionText}>
          Connection error, server offline
        </Text>
        <TouchableOpacity
          style={styles.refreshBtn}
          onPress={() => {
            showMessage({
              message: "SUCCESS",
              description: "Back online",
              type: "success",
            });
            check().then(() => {
              console.log(changePage);
              if (changePage != "ERROR") {
                navigation.navigate(changePage);
                showMessage({
                  message: "SUCCESS",
                  description: "Back online",
                  type: "success",
                });
              } else {
                showMessage({
                  message: "ERROR",
                  description: "Unable to connect to the server",
                  type: "danger",
                });
              }
            });
          }}
        >
          <Text style={styles.connectionText}>RELOAD</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, justifyContent: "center", alignItems: "center" },
  view1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  refreshBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  connectionText: {
    fontFamily: "NewYork",
    fontSize: fontSize(20),
  },
});

export default NoConnectionScreen;
