import React, { useState } from "react";
import { View, Text } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./Welcome";
import HomeScreenEwe from "./Ewelink";
import About from "./About";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConnectingScreen from "../connectingScreen";

let wait = null;

const Drawer = createDrawerNavigator();

const HomeScreenDrawer = (props) => {
  const [dra, setDra] = useState("");

  const ewedrawer = async () => {
    const ewelinkA = await AsyncStorage.getItem("ewelink");
    setDra(ewelinkA == null ? 0 : ewelinkA);
  };

  ewedrawer();

  // if (props.oneTime == true) {
  //   setDra(0);
  // }

  while (dra == "") {
    return <ConnectingScreen />;
  }
  if (dra == 1) {
    return (
      <Drawer.Navigator initialRouteName={"Home"} backBehavior={"none"}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen
          name="Ewelink"
          component={HomeScreenEwe}
          options={{ headerLeftLabelVisible: false }}
        />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    );
  } else if (dra == 0) {
    return <HomeScreen />;
  }
};

export default HomeScreenDrawer;
