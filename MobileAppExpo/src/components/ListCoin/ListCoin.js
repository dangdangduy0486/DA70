import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from "react-native";
import React from "react";
import { COLORS } from "../../color/Color";
import * as Animatable from "react-native-animatable";
const ListCoin = ({
  urlLogo,
  name,
  symbol,
  currentPrice,
  priceChangePercentage24h,
  onPress,
}) => {
  const colorPrice = priceChangePercentage24h > 0 ? "green" : "red";
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.coinWrapper}>
        {/* left */}
        <View style={styles.left}>
          <Image
            source={{
              uri: urlLogo,
            }}
            style={styles.img}
          />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.symbol}>{symbol}</Text>
          </View>
        </View>
        {/* right */}
        <View style={styles.right}>
          <Text style={styles.title}>${currentPrice}</Text>
          <Text style={[styles.symbol, { color: colorPrice }]}>
            {priceChangePercentage24h.toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListCoin;

const styles = StyleSheet.create({
  coinWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleWrapper: {
    marginLeft: 10,
  },
  title: {
    color: "white",
    fontSize: 19,
  },
  img: {
    height: 50,
    width: 50,
  },
  symbol: { color: COLORS.secondColor, fontSize: 15 },
  right: {
    alignItems: "flex-end",
  },
});
