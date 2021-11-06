import React, { useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import ModalSelector from "react-native-modal-selector";
import execWS from "../services/wsConnection";
import { showMessage } from "react-native-flash-message";

import colors from "../colors/colors";

const fontSize = (font) => {
  return Platform.OS == "ios" ? font + 8 : font;
};

const RegisterScreen = ({navigation}) => {
  const [hasEwelink, setEwelink] = useState("No");

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [licensePlate, setLicensePlate] = useState();

  let ewemail;
  let ewpassword;

  const pRef = useRef();
  const LPRef = useRef();
  const SRef = useRef();
  const EwpaswordRef = useRef();

  let pas;

  const handleButton = () => {
    if (hasEwelink == "Yes") {
      execWS(3, {
        username: username,
        password: password,
        licensePlate: licensePlate,
        ewelink: 1,
        ewemail: ewemail,
        ewpassword,
        ewpassword,
      }).then((r) => {
        if (r) {
          navigation.navigate('Login')
          showMessage({
            message: "SUCCESS",
            description: "You've been registered correctly",
            type: "success",
          });
        }else{
          showMessage({
            message: "FAILED",
            description: "There's been an error uploading data",
            type: "danger",
          });
        }
      });
    } else {
      execWS(3, {
        username: username,
        password: password,
        licensePlate: licensePlate,
        ewelink: 0,
      }).then((r) => {
        if (r) {
          navigation.navigate('Login')
          showMessage({
            message: "SUCCESS",
            description: "You've been registered correctly",
            type: "success",
          });
        }else{
          showMessage({
            message: "FAILED",
            description: "There's been an error uploading data",
            type: "danger",
          });
        }
      });
    }
  };

  const data = [
    { key: 1, label: "Yes" },
    { key: 2, label: "No" },
  ];

  const ShowEwelink = () => {
    if (hasEwelink == "Yes") {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: 10,
          }}
        >
          <View style={styles.ewelinkInputView}>
            <TextInput
              placeholder="Ewelink Email"
              style={styles.inputText}
              keyboardType="default"
              returnKeyType="next"
              textAlign="center"
              autoCapitalize="none"
              //blurOnSubmit={false}
              value={ewemail}
              onChangeText={(t) => {
                ewemail = t;
              }}
              onSubmitEditing={() => {
                EwpaswordRef.current.focus();
              }}
            />
          </View>
          <View style={styles.ewelinkInputView}>
            <TextInput
              ref={EwpaswordRef}
              placeholder="Ewelink Password"
              style={styles.inputText}
              keyboardType="default"
              returnKeyType="next"
              textAlign="center"
              autoCapitalize="none"
              textContentType="password"
              //blurOnSubmit={false}
              value={ewpassword}
              onChangeText={(t) => {
                ewpassword = t;
              }}
            />
          </View>
        </View>
      );
    } else {
      return <></>;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="white" />
      <View style={styles.registrationTextView}>
        <Text style={styles.registrationText}>REGISTRATION HERE</Text>
      </View>
      <View style={styles.inputsView}>
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.usernameView}>
            <TextInput
              placeholder="Username"
              style={styles.inputText}
              keyboardType="default"
              returnKeyType="next"
              textAlign="center"
              autoCapitalize="none"
              blurOnSubmit={false}
              value={username}
              onChangeText={(t) => {
                setUsername(t);
              }}
              onSubmitEditing={() => pRef.current.focus()}
            />
          </View>
          <View style={styles.passwordView}>
            <TextInput
              ref={pRef}
              placeholder="Password"
              style={styles.inputText}
              keyboardType="default"
              returnKeyType="next"
              textAlign="center"
              autoCapitalize="none"
              textContentType="password"
              blurOnSubmit={false}
              value={password}
              onChangeText={(t) => {
                setPassword(t);
              }}
              onSubmitEditing={() => LPRef.current.focus()}
            />
          </View>
          <View style={styles.licensePlateView}>
            <TextInput
              ref={LPRef}
              placeholder="License Plate"
              style={styles.inputText}
              keyboardType="default"
              returnKeyType="next"
              textAlign="center"
              autoCapitalize="none"
              blurOnSubmit={false}
              value={licensePlate}
              onChangeText={(t) => {
                setLicensePlate(t);
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "70%",
                justifyContent: "center",
              }}
            >
              <View style={styles.ewelinkView}>
                <Text
                  style={{
                    fontFamily: "NewYork",
                    fontSize: fontSize(20),
                    textAlign: "center",
                  }}
                >
                  Do you have ewelink?
                </Text>
                <View style={{ marginTop: 20 }}>
                  <ModalSelector
                    ref={SRef}
                    data={data}
                    overlayStyle={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                    onChange={(options) => {
                      setEwelink(options.label);
                    }}
                  >
                    <View
                      style={{
                        borderColor: "black",
                        borderWidth: 1,
                        borderRadius: 25,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontFamily: "NewYork",
                          fontSize: fontSize(20),
                        }}
                      >
                        {hasEwelink}
                      </Text>
                    </View>
                  </ModalSelector>
                </View>
              </View>
            </View>
          </View>
          <ShowEwelink />
        </ScrollView>
      </View>
      <View style={styles.submitBtnView}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleButton}>
          <Text style={{ fontFamily: "NewYork", fontSize: fontSize(25) }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "white" },
  registrationTextView: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  registrationText: {
    fontFamily: "NewYork",
    textAlign: "center",
    fontSize: fontSize(30),
  },
  inputsView: {
    flex: 0.75,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtn: {
    width: 120,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  submitBtnView: {
    flex: 0.1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  usernameView: {
    flex: 0.2,
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordView: {
    flex: 0.2,
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  licensePlateView: {
    flex: 0.2,
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  ewelinkView: {
    flex: 0.2,
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
  },
  ewelinkInputView: {
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  inputText: {
    width: "65%",
    height: 50,
    borderRadius: 25,
    //bottom: 20,
    fontFamily: "NewYork",
    fontSize: fontSize(20),
    backgroundColor: colors.p_light,
  },
});

export default RegisterScreen;
