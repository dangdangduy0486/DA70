import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import VictoryCustomTheme from "../VictoryCustomTheme";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
} from "victory-native";
import Loading from "../../pages/Loading/Loading";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "../../color/Color";
const ChartCoin = ({ coin }) => {
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState(false);
  const [chartCoin, setChartCoin] = useState([]);
  const [chartCoin1, setChartCoin1] = useState([]);
  const [optionSelected, setOptionSelected] = useState(1);
  const route = useRoute();
  const { id, option } = route.params;

  useEffect(() => {
    setChartCoin1(coin);
    setIsLoading(false);
  }, [coin]);
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${optionSelected}`,
        {
          params: {
            id: coin.id,
            optionSelected: optionSelected,
          },
        }
      )
      .then((res) => {
        const formatData = res.data.prices.map((i) => {
          return {
            x: i[0],
            y: i[1],
          };
        });
        setChartCoin(formatData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, [coin, optionSelected]);
  if (!chartCoin1 || !chartCoin || isError || isLoading) return <Loading />;
  return (
    <View style={styles.container_chart}>
      <View style={styles.header_chart}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: `${chartCoin1.image.thumb}` }}
              style={{ width: 30, height: 30, marginTop: 5 }}
            />
            <View style={{ marginLeft: 7 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {chartCoin1.name}
              </Text>
              <Text style={{ fontSize: 13, color: COLORS.secondColor }}>
                {chartCoin1.symbol.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 13, fontWeight: "bold" }}>
            ${chartCoin1.market_data.current_price.usd.toFixed(4)}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color:
                chartCoin1.market_data.price_change_percentage_24h > 0
                  ? "green"
                  : "red",
            }}
          >
            {chartCoin1.market_data.price_change_percentage_24h.toFixed(4)}%
          </Text>
        </View>
      </View>
      <View style={styles.header_chart}>
        <VictoryChart theme={VictoryCustomTheme} height={200}>
          <VictoryAxis
            style={{
              tickLabels: { display: "none" },
            }}
            dependentAxis
          />
          <VictoryAxis
            style={{
              tickLabels: {
                display: "none",
              },
            }}
          />
          <VictoryLine
            style={{
              data: { stroke: "#000" },
            }}
            data={chartCoin}
            animate={{ duration: 2000, onLoad: { duration: 2000 } }}
          />
        </VictoryChart>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: -16,
          marginBottom: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => setOptionSelected(1)}
          style={
            optionSelected == 1 ? styles.optiondaySelected : styles.optionday
          }
        >
          <Text style={{}}>1day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            optionSelected == 7 ? styles.optiondaySelected : styles.optionday
          }
          onPress={() => setOptionSelected(7)}
        >
          <Text>7days</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            optionSelected == 14 ? styles.optiondaySelected : styles.optionday
          }
          onPress={() => setOptionSelected(14)}
        >
          <Text>14days</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            optionSelected === "max"
              ? styles.optiondaySelected
              : styles.optionday
          }
          onPress={() => setOptionSelected("max")}
        >
          <Text>Max</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChartCoin;

const styles = StyleSheet.create({
  container_chart: {
    marginTop: 16,
    marginHorizontal: 10,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
  },
  header_chart: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 16,
  },
  optionday: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  optiondaySelected: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: COLORS.yellow1,
  },
});
