import axios from "axios";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

export default function Home() {
  const [markets, setMarkets] = useState(null);
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  const callAPI = axios.create({
    baseURL: url,
    timeout: 1000,
  });
  useEffect(() => {
    try {
      callAPI
        .get()
        .then((response) => {
          setMarkets(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!markets) return null;
  //   console.log(markets);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Hello</Text>
        {markets &&
          markets.map((market, index) => (
            <Text key={index} style={styles.text}>{market.name}</Text>
          ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    color: "#fff",
  },
});
