import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Signup from "../../pages/Signup/Signup";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Login from "../../pages/Login/Login";
import Tabs from "./Tabs";
import Home from "../../pages/Home/Home";
import { COLORS } from "../../color/Color";
import { TouchableOpacity } from "react-native-gesture-handler";
const Drawer = createDrawerNavigator();

const User = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.yellow1,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          height: 60,
          width: 60,
          borderRadius: 30,
          borderColor: "black",
          borderWidth: 3,
        }}
      />
      <Text style={{ fontSize: 16, fontWeight: "bold", paddingVertical: 5 }}>
        Cao Minh Bao
      </Text>
    </View>
  );
};
const Guest = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: COLORS.white,
        height: 100,
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: COLORS.yellow1,
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: COLORS.yellow1,
        }}
      >
        <Text>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};
const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <User />
      <Guest />
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        labelStyle={{
          color: "white",
          fontSize: 20,
        }}
        label="Logout"
        icon={(color) => (
          <MaterialCommunityIcons
            name="logout"
            size={30}
            color={COLORS.yellow1}
          />
        )}
      />
    </View>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: "100%",
          backgroundColor: COLORS.black,
        },
        drawerLabelStyle: { fontSize: 16, fontWeight: "bold", color: "white" },
        swipeEdgeWidth: Dimensions.get("window").width / 2,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        options={{ headerShown: false }}
        name="DBCoin"
        component={Tabs}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={Signup}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
