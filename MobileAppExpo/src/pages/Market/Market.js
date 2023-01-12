import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../color/Color";
import ListCoin from "../../components/ListCoin/ListCoin";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Animatable from "react-native-animatable";
const Market = ({ navigation }) => {
  const [coinList, setCoinList] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoinList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Market</Text>
      </View>
      <View style={styles.divider} />

      <FlatList
        keyExtractor={(item) => item.id}
        data={coinList}
        renderItem={({ item }) => (
          <Animatable.View animation="slideInDown" duration={1000} delay={300}>
            <ListCoin
              urlLogo={item.image}
              name={item.name}
              symbol={item.usdt}
              currentPrice={item.current_price}
              priceChangePercentage24h={item.price_change_percentage_24h}
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate("CoinDetail", {
                  id: item.id,
                });
              }}
            />
          </Animatable.View>
        )}
      />
    </View>
  );
};

export default Market;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    height: 50,
  },
  titleWrapper: {
    marginTop: 80,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.yellow1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.secondColor,
    marginHorizontal: 16,
    marginTop: 16,
  },
});
