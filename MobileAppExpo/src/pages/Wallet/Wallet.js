import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Overview from "../../components/Overview/Overview";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Funding from "../../components/Funding/Funding";
import Futures from "../../components/Futures/Futures";
import Fiat from "../../components/Fiat/Fiat";
import { COLORS } from "../../color/Color";
const Tab = createMaterialTopTabNavigator();
const Wallet = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: "black" },
          tabBarActiveTintColor: COLORS.yellow1,
          tabBarIndicatorStyle: { backgroundColor: COLORS.yellow1 },
        }}
      >
        <Tab.Screen name="Overview" component={Overview} />
        <Tab.Screen name="Fiat" component={Fiat} />
        <Tab.Screen name="Funding" component={Funding} />
        <Tab.Screen name="Futures" component={Futures} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Wallet;
