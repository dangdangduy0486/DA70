import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import BackAction from "../../components/BackAction/BackAction";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from "../../color/Color";
import BuyPtoP from "../../components/BuyPtoP/BuyPtoP";
import SellPtoP from "../../components/SellPtoP/SellPtoP";
import CreatePtoP from "../../components/CreatePtoP/CreatePtoP";
import AcceptBuy from "../../components/BuyPtoP/AcceptBuy";
const Tab = createMaterialTopTabNavigator();
const PtoP = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <BackAction />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: "black" },
          tabBarActiveTintColor: COLORS.yellow1,
          tabBarIndicatorStyle: { backgroundColor: COLORS.yellow1 },
        }}
      >
        <Tab.Screen name="Buy" component={BuyPtoP} />
        <Tab.Screen name="Sell" component={SellPtoP} />
        <Tab.Screen name="Post" component={CreatePtoP} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default PtoP;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",
    backgroundColor: "yellow",
  },
  //   main: {
  //     flex: 4,
  //     backgroundColor: "white",
  //     borderTopLeftRadius: 20,
  //     borderTopRightRadius: 20,
  //     paddingVertical: 20,
  //     marginBottom: 10,
  //   },
});
