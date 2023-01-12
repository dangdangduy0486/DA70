import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../color/Color";
const Overview = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Text style={styles.title}>Wallet Overview</Text>
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "white",
            width: 100,
            height: 70,
            borderRadius: 7,
            borderWidth: 1,
          }}
          onPress={() => navigation.navigate("Ptop")}
        >
          <MaterialCommunityIcons
            name="human-greeting-proximity"
            size={30}
            style={{ color: COLORS.yellow1 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            P2P
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "white",
            width: 100,
            height: 70,
            borderRadius: 7,
            borderWidth: 1,
          }}
          onPress={() => navigation.navigate("Recharge")}
        >
          <MaterialCommunityIcons
            name="currency-usd"
            size={30}
            style={{ color: COLORS.yellow1 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",

              marginTop: 5,
            }}
          >
            Recharge
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listWallet}>
        <Text style={styles.info}>My Assets</Text>
        <View style={styles.divider} />
        <View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
            onPress={() => navigation.navigate("Fiat")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="orbit-variant"
                size={30}
                style={{ color: COLORS.yellow1, paddingRight: 5 }}
              />
              <Text style={{ color: COLORS.textColor }}>Fiat</Text>
            </View>
            <Text style={{ color: COLORS.textColor }}>0.00BTC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
            onPress={() => navigation.navigate("Funding")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="perspective-less"
                size={30}
                style={{ color: COLORS.yellow1, paddingRight: 5 }}
              />
              <Text style={{ color: COLORS.textColor }}>Funding</Text>
            </View>
            <Text style={{ color: COLORS.textColor }}>0.00BTC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
            onPress={() => navigation.navigate("Futures")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="chart-timeline-variant"
                size={30}
                style={{ color: COLORS.yellow1, paddingRight: 5 }}
              />
              <Text style={{ color: COLORS.textColor }}>Futures</Text>
            </View>
            <Text style={{ color: COLORS.textColor }}>0.00BTC</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Overview;

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
