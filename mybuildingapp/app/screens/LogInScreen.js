import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Platform,
  Alert,
} from "react-native";

import colors from "../colors/colors";

import execWS from "../services/wsConnection";

const fontSize = (font) => {
  return Platform.OS == "ios" ? font + 8 : font;
};

function LogInScreen({ navigation }) {
  const passwordField = useRef();

  const [inputValueEmail, emptyInputEmail] = useState();
  const [inputValuePassword, emptyInputPassword] = useState();
  const [response, setResponse] = useState("");

  // AsyncStorage.multiRemove([
  //   "username",
  //   "password",
  //   "ewelink",
  //   "ewemail",
  //   "ewpassword",
  // ]);
  //AsyncStorage.setItem("id", "0");

  const buttonHandler = async () => {
    if (inputValueEmail && inputValuePassword) {
      execWS(1, {
        username: inputValueEmail,
        password: inputValuePassword,
      }).then(function (valid) {
        emptyInputEmail("");
        emptyInputPassword("");
        if (valid.return) {
          navigation.navigate("HomeApp" /*, { oneTime: true }*/);
          AsyncStorage.setItem("id", `${valid.data.id}`);
          AsyncStorage.setItem("username", `${valid.data.username}`);
          AsyncStorage.setItem("ewelink", `${valid.data.ewelink}`);
          if (valid.data.ewelink == 1) {
            AsyncStorage.setItem("ewemail", `${valid.data.ewemail}`);
            AsyncStorage.setItem("ewpassword", `${valid.data.ewpassword}`);
          } else {
            AsyncStorage.multiRemove(["ewemail", "ewpassword"]);
          }
        } else {
          Alert.alert(
            "Username or password were incorrect",
            "Either the username or the password weren't correct, please make sure they are correct and that you're already registered"
          );
        }
      });
    } else {
      Alert.alert("Field(s) are empty", "Make sure you've filled every field");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.safeArea}>
        <View style={styles.logoSection}>
          <Image
            style={styles.logoImg}
            // source={require("../assets/logo.png")}
            source={{
              uri: "https://github.com/ruzafa8/SmartBuilding/blob/main/SmartBuildingLogopng.png?raw=true",
            }}
          />
          <Text
            style={{
              fontFamily: "NewYork",
              fontSize: fontSize(30),
              textAlign: "center",
            }}
          >
            My Smart Building
          </Text>
        </View>
        <View style={styles.loginSection}>
          <View style={styles.loginTextView}>
            <Text style={styles.loginText}>Welcome, login here</Text>
          </View>
          <View style={styles.inputsView}>
            <View style={styles.inputEmailView}>
              <TextInput
                placeholder="Username"
                style={styles.inputText}
                keyboardType="default"
                returnKeyType="next"
                textAlign="center"
                autoCapitalize="none"
                dataDetectorTypes="address"
                textContentType="emailAddress"
                onChangeText={(telf) => {
                  setResponse(telf);
                  emptyInputEmail(telf);
                }}
                multiline={false}
                onSubmitEditing={() => {
                  passwordField.current.focus();
                }}
                blurOnSubmit={false}
                value={inputValueEmail} /*maxLength={9}*/
              />
            </View>
            <View style={styles.inputPasswordView}>
              <TextInput
                ref={passwordField}
                placeholder="Password"
                style={styles.inputText}
                keyboardType="default"
                returnKeyType="done"
                textAlign="center"
                autoCapitalize="none"
                dataDetectorTypes="all"
                textContentType="password"
                secureTextEntry
                onChangeText={(telf) => {
                  setResponse(telf);
                  emptyInputPassword(telf);
                }}
                multiline={false}
                onSubmitEditing={buttonHandler}
                value={inputValuePassword} /*maxLength={9}*/
              />
            </View>

            <View style={styles.loginBtnSection}>
              <TouchableOpacity style={styles.loginBtn} onPress={buttonHandler}>
                <Text style={styles.loginText}> Log In </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.registerView}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text style={styles.registerText}>
                  Don't have an account? Register here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    //alignItems: "center"
  },
  safeArea: {
    // alignItems: "center",
    flexDirection: "column",
    borderRadius: 25,
    flex: 1,
    backgroundColor: "white",
  },
  loginSection: {
    //position: "absolute",
    flex: 0.65,
    // width: "100%",
    // height: "100%",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "magenta",
  },
  loginBtnSection: {
    alignItems: "center",
    justifyContent: "flex-end",
    //backgroundColor: "brown",
    flex: 0.2,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 40,
    // marginBottom: 10,
  },
  loginTextView: {
    flex: 0.1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loginText: {
    color: "black",
    fontSize: fontSize(20),
    fontFamily: "NewYork",
    fontWeight: "bold",
  },
  text: {
    //backgroundColor: colors.white,
    height: 50,
    color: colors.white,
    borderRadius: 25,
    bottom: 20,
    fontFamily: "NewYork",
    fontSize: fontSize(20),
  },
  inputsView: {
    flex: 0.85,
    //backgroundColor: "blue",
    width: "100%",
  },
  inputEmailView: {
    flex: 0.15,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    //marginBottom: 10,
    //backgroundColor: "yellow",
  },
  inputPasswordView: {
    flex: 0.15,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    //marginBottom: 20,
    //backgroundColor: "yellow",
  },
  inputText: {
    backgroundColor: colors.white,
    width: "65%",
    height: 50,
    borderRadius: 25,
    //bottom: 20,
    fontFamily: "NewYork",
    fontSize: fontSize(20),
    backgroundColor: "rgba(255, 102, 99, 0.7)",
  },
  inputCode: {
    backgroundColor: colors.white,
    width: "65%",
    height: 50,
    borderRadius: 25,
    fontFamily: "NewYork",
    fontSize: fontSize(20),
  },
  dark: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    width: "100%",
  },
  logoText: {
    fontSize: fontSize(30),
    fontFamily: "NewYork",
    color: "#fff",
    top: 20,
  },
  logoImg: {
    width: 200,
    height: 190,
  },
  logoSection: {
    //position: "absolute",
    //top: Platform.OS === "ios" ? 80 : 45,
    flex: 0.35,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "red",
  },
  registerView: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "pink",
  },
  registerButton: {},
  registerText: {
    fontFamily: "NewYork",
    fontSize: fontSize(15),
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    fontWeight: "bold",
  },
  bottomView: {
    justifyContent: "flex-end",
    bottom: Platform.OS === "ios" ? 10 : 35,
  },
  bottomText: {
    fontSize: fontSize(15),
    fontFamily: "NewYork",
    color: colors.white,
  },
});

export default LogInScreen;
