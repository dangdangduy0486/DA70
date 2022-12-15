import { View, Text } from "react-native";
import React from "react";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Market from "../../pages/Market/Market";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../../pages/Signup/Signup";
import CoinDetail from "../../pages/CoinDetail/CoinDetail";
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CoinDetail"
        component={CoinDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Market"
        component={Market}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={Signup}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
