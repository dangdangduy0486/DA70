import axios from "axios";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { DataTable, IconButton, MD3Colors } from "react-native-paper";

export default MarketsScreen = () => {
  const [markets, setMarkets] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [currentPage, setCurrentPage] = useState(1);
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${currentPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

  const handlePreviousPage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
  const handleFirstPage = () => {
    setCurrentPage((currentPage) => (currentPage = 1));
  };
  const handleLastPage = () => {
    setCurrentPage((currentPage) => (currentPage = 133));
  };

  const getMarkets = (vsCurrency, currentPage) => {
    setIsLoading(true);
    try {
      axios
        .get(url, {
          params: {
            vs_currency: vsCurrency,
            page: currentPage,
          },
        })
        .then((response) => {
          setMarkets(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMarkets(vsCurrency, currentPage);
  }, [vsCurrency, currentPage]);
  if (isLoading) {
    return (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    );
  }
  return (
    <>
      <ScrollView style={{ width: "100%" }}>
        <ScrollView style={{ width: "100%" }} horizontal={true}>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={styles.cellID}>ID</DataTable.Title>
              <DataTable.Title style={styles.cells}>Coin</DataTable.Title>
              <DataTable.Title style={styles.cells}>Price</DataTable.Title>
              <DataTable.Title style={styles.cells}>1h</DataTable.Title>
              <DataTable.Title style={styles.cells}>24h</DataTable.Title>
              <DataTable.Title style={styles.cells}>7d</DataTable.Title>
              <DataTable.Title style={styles.cells}>Volume</DataTable.Title>
            </DataTable.Header>
            {markets &&
              markets.map((market, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.cellID}>
                    {market.market_cap_rank ? market.market_cap_rank : "#"}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cells}>
                    {market.name}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cells}>
                    {market.current_price}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cells}>
                    {market.price_change_percentage_1h_in_currency}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cells}>
                    {market.price_change_percentage_24h_in_currency}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cells}>
                    {market.price_change_percentage_7d_in_currency}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cells}>
                    {market.total_volume}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            <SafeAreaView style={styles.paginationContainer}>
              <View>
                <IconButton
                  icon="arrow-collapse-left"
                  // iconColor={MD3Colors}
                  size={20}
                  onPress={() => handleFirstPage()}
                />
              </View>
              <View>
                <IconButton
                  icon="arrow-left"
                  // iconColor={MD3Colors}
                  size={20}
                  onPress={() => handlePreviousPage()}
                />
              </View>
              <Text>{currentPage}</Text>
              <View>
                <IconButton
                  icon="arrow-right"
                  // iconColor={MD3Colors}
                  size={20}
                  onPress={() => handleNextPage()}
                />
              </View>
              <View>
                <IconButton
                  icon="arrow-collapse-right"
                  // iconColor={MD3Colorsr}
                  size={20}
                  onPress={() => handleLastPage()}
                />
              </View>
            </SafeAreaView>
          </DataTable>
        </ScrollView>
      </ScrollView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
  },
  cellID: {
    flex: 1,
    flexGrow: 2,
    flexShrink: 1,
    flexBasis: 50,
  },
  cells: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 100,
  },
  paginationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
