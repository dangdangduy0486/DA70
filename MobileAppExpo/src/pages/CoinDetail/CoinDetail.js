import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  SafeAreaView,
} from "react-native";

import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Loading from "../Loading/Loading";
import axios from "axios";
import BackAction from "../../components/BackAction/BackAction";
import ChartCoin from "../../components/ChartCoin/ChartCoin";
const CoinDetail = (navigation) => {
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState(false);
  const [coinInfo, setCoinInfo] = useState([]);
  const route = useRoute();
  const { id } = route.params;
  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        setCoinInfo(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, [id]);
  if (!coinInfo || isError || isLoading) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <BackAction />
      <ScrollView
        style={{ flex: 1, paddingBottom: 10, backgroundColor: "red" }}
      >
        <ChartCoin coin={coinInfo} />
        {/* <View style={styles.container_chart}>
          <View style={styles.header_chart}></View>
          <Text style={{ color: "black" }}>{coinInfo.name}</Text>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CoinDetail;

const styles = StyleSheet.create({});
