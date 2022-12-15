import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home/Home";
import Login from "./src/pages/Login/Login";
import Tabs from "./src/components/navigation/Tabs";
import Market from "./src/pages/Market/Market";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator> */}
      <Tabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
