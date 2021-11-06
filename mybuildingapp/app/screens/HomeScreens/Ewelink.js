import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ListItems from "../../services/listItems";

export default function HomeScreenEwe() {
  const [username, setUser] = useState();
  const GetUsername = async () => {
    setUser(await AsyncStorage.getItem("username"));
    //console.log(username);
  };
  GetUsername();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view1}>
        <Text style={styles.welcomText}>Welcome, {username}</Text>
      </View>
      <View style={styles.view2}>
        <View style={styles.view2View}>
          <Text style={styles.view2Text}>Configurate your devices here</Text>
        </View>
        <ListItems />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "white" },
  view1: { flex: 0.2, alignItems: "center", justifyContent: "center" },
  view2: { flex: 0.85, alignItems: "center", justifyContent: "center" },
  view2View: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    //backgroundColor: "red",
  },
  view2Text: { fontFamily: "NewYork", fontSize: 20 },
  welcomText: { fontFamily: "NewYork", fontSize: 30 },
});
