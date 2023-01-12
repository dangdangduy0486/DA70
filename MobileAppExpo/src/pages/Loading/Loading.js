import { StyleSheet, Text, View, Animated } from "react-native";
import React from "react";
import { COLORS } from "../../color/Color";
import Lottie from "lottie-react-native";
const Loading = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie source={require("../../images/Loading.json")} autoPlay loop />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
