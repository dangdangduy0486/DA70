import axios from "axios";
import * as React from "react";
import { View, Dimensions, Text } from "react-native";
import Carousel from "react-native-looped-carousel";

const { width, height } = Dimensions.get("window");
const size = { width, height };
export default CarouselTrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const url = "https://api.coingecko.com/api/v3/search/trending";
  React.useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setTrendingCoins(res.data);
        setIsLoading(true);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);
  if (!trendingCoins || !isLoading) return null;
  console.log(trendingCoins);
  retun(
    <View>
      <Carousel delay={2000} style={size} autoplay pageInfo onAni>
        <View style={[{ backgroundColor: "#BADA55" }, size]}>
          <Text>1</Text>
        </View>
      </Carousel>
    </View>
  );
};
