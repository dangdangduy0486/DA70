import { View, Text, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../pages/Home/Home";
import Market from "../../pages/Market/Market";
import Exchange from "../../pages/Exchange/Exchange";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../color/Color";
import Wallet from "../../pages/Wallet/Wallet";
import StackNavigation from "./StackNavigation";
const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLORS.yellow1,
        tabBarStyle: {
          backgroundColor: COLORS.black,
          borderTopWidth: 0,
          height: 100,
        },
      }}
    >
      <Tab.Screen
        name="Home1"
        component={Home}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <MaterialCommunityIcons name="home" size={30} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarLabel: "Market",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <MaterialCommunityIcons name="shopping" size={30} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Exchange"
        component={Exchange}
        options={{
          tabBarLabel: "Exchange",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <MaterialCommunityIcons
                name="swap-horizontal-bold"
                size={30}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarLabel: "Wallet",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <MaterialCommunityIcons name="account" size={30} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
