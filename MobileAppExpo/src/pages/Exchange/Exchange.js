import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
const Exchange = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>Exchange with id : </Text>
    </SafeAreaView>
  );
};

export default Exchange;
