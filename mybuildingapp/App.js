// import { StatusBar } from "expo-status-bar";

import { useFonts } from "expo-font";

import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  AppState,
  StyleSheet,
  StatusBar,
} from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";

import HomeScreenDrawer from "./app/screens/HomeScreens/HomeScreenDrawer";
import LogInScreen from "./app/screens/LogInScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ConnectingScreen from "./app/screens/connectingScreen";

import execWS from "./app/services/wsConnection";
import NoConnectionScreen from "./app/screens/noConnection";

const Stack = createStackNavigator();

function App() {
  const [startPage, setPage] = useState("");

  //AsyncStorage.setItem("id", "0");
  const checkKey = async () => {
    if ((await AsyncStorage.getItem("id")) == undefined) {
      console.log("[INFO] ID ASSIGNED: 0");
      await AsyncStorage.setItem("id", `0`);
    }
  };
  checkKey();

  const check = async () => {
    console.log("[INFO] Checking logged");
    let id = await AsyncStorage.getItem("id");
    console.log(id);
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
      execWS(2, { id: null }).then(function (valid) {
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

  check();

  const [loaded] = useFonts({
    NewYork: require("./app/fonts/KGEverSinceNewYork.ttf"),
  });

  if (!loaded) {
    return (
      <SafeAreaView
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (startPage == "") {
    return <ConnectingScreen />;
  }

  console.log(StatusBar.currentHeight);

  return (
    <NavigationContainer>
      <StatusBar
        /*hidden={Platform.OS === 'ios' ? true : false}*/
        backgroundColor={"white"}
        barStyle={"dark-content"}
      />
      <Stack.Navigator
        initialRouteName={startPage}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="HomeApp"
          component={HomeScreenDrawer}
          options={{
            gestureEnabled: false,
            headerLeft: () => null,
            headerRight: () => nul,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LogInScreen}
          options={{
            gestureEnabled: false,
            headerLeft: () => null,
            headerRight: () => nul,
          }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ERROR" component={NoConnectionScreen} />
        {/* <Stack.Screen name="Camera" component={CameraScreen}/>    */}
      </Stack.Navigator>
      <FlashMessage
        duration={2000}
        position={
          Platform.OS === "ios"
            ? "top"
            : { top: StatusBar.currentHeight, left: 0, right: 0 }
        }
        // position="center"
        floating={Platform.OS !== "ios"}
        style={styles.flashmessage}
      />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flashmessage: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
