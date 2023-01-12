import { View, Text } from "react-native";
import React from "react";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Market from "../../pages/Market/Market";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../../pages/Signup/Signup";
import CoinDetail from "../../pages/CoinDetail/CoinDetail";
import Forgot from "../../pages/Forgot/Forgot";
import Newpassword from "../../pages/Newpassword/Newpassword";
import DrawerNavigation from "./DrawerNavigation";
import BackAction from "../BackAction/BackAction";
import Wallet from "../../pages/Wallet/Wallet";
import Overview from "../Overview/Overview";
import Recharge from "../../pages/Recharge/Recharge";
import Funding from "../Funding/Funding";
import PtoP from "../../pages/P2P/PtoP";
import AcceptBuy from "../BuyPtoP/AcceptBuy";
import AcceptSell from "../SellPtoP/AcceptSell";
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={DrawerNavigation}
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
        name="reset"
        component={Newpassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AcceptBuy"
        component={AcceptBuy}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AcceptSell"
        component={AcceptSell}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Forgot"
        component={Forgot}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={Signup}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="BackAction"
        component={BackAction}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Wallet"
        component={Wallet}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Overview"
        component={Overview}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Recharge"
        component={Recharge}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Ptop"
        component={PtoP}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
