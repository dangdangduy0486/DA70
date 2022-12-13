// import axios from "axios";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
// import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";

import CarouselTrendingCoins from "../components/CarouselTrendingCoins";
// import Loading from "./loading/loading";

export default MainScreen = ({ navigation }) => {
  // const [trendCoins, setTrendingCoins] = useState(null);
  // const url = "https://api.coingecko.com/api/v3/exchange_rates";
  //   const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       setTrendingCoins(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsError(true);
  //     });
  // }, []);
  //   if (!trendCoins || isError) return null
  // if (!trendCoins) return null;
  //   <Loading />;
  const navigationRef = useNavigationContainerRef();
  return (
    <View style={{ flex: 1 }}>
      <Text onPress={() => navigationRef.navigate("MarketsScreen")}>Go home</Text>
      <NavigationContainer ref={navigationRef} independent={true}>
        {/* ... */}
      </NavigationContainer>
      <Button
        title="Go somewhere"
        onPress={() => {
          // Navigate using the `navigation` prop that you received
          navigation.navigate("MarketsScreen");
        }}
      />
      <CarouselTrendingCoins />
    </View>
  );
};
const styles = StyleSheet.create({});
