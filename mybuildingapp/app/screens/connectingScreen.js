import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

const ConnectingScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view1}>
        <Text>Connecting to server...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, justifyContent: "center", alignItems: "center" },
  view1: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ConnectingScreen;
