import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../color/Color";

const Fiat = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Text style={styles.title}>Wallet Fiat</Text>
      <View style={styles.listWallet}>
        <Text style={styles.info}>My Assets</Text>
        <View style={styles.divider} />
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginBottom: 16,
            }}
          >
            <Text style={{ color: "white" }}>BTC</Text>
            <Text style={{ color: "white" }}>100</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginBottom: 16,
            }}
          >
            <Text style={{ color: "white" }}>USDT</Text>
            <Text style={{ color: "white" }}>200</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginBottom: 16,
            }}
          >
            <Text style={{ color: "white" }}>VND</Text>
            <Text style={{ color: "white" }}>100</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Fiat;

const styles = StyleSheet.create({
  title: {
    backgroundColor: COLORS.yellow1,
    paddingBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 1,
    borderStyle: "solid",
    overflow: "hidden",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  listWallet: {
    padding: 20,

    flex: 1,
  },
  info: {
    color: COLORS.textColor,
    fontSize: 19,
    fontWeight: "500",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.secondColor,
    marginTop: 16,
    marginBottom: 16,
  },
});
