import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const ChartCoin = ({ coin }) => {
  const [coin1, setCoin1] = useState([]);

  return (
    <View style={styles.container_chart}>
      <View style={styles.header_chart}>
        <View style={{ flex: 1 }}></View>
      </View>
      <Text style={{ color: "green", paddingVertical: 10 }}>{coin.name}</Text>
    </View>
  );
};

export default ChartCoin;

const styles = StyleSheet.create({
  container_chart: {
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "yellow",
  },
  header_chart: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 16,
  },
});
