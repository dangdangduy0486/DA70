import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Iconic from "react-native-vector-icons/Ionicons";

import MarketsScreen from "../screens/MarketsScreen";
import MainScreen from "../screens/MainScreen";

const Tab = createBottomTabNavigator();

export default NavigationBottom = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { backgroundColor: "#AD40AF" },
            tabBarInactiveTintColor: "#fff",
            tabBarActiveTintColor: "yellow",
          },
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === "MainScreen") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "MarketsScreen") {
              iconName = focused ? "bar-chart" : "bar-chart-outline";
            }
            return <Iconic name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="MainScreen" component={MainScreen} />
        <Tab.Screen name="MarketsScreen" component={MarketsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
