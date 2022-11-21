// import axios from 'axios';
// const axios = require('axios');
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';

const Markets = () => {
  // const styles = StyleSheet.create({
  //   container: {flex: 1, padding: 16, paddingTop: 100, backgroundColor: '#fff'},
  //   head: {height: 40, backgroundColor: 'orange'},
  //   wrapper: {flexDirection: 'row'},
  //   title: {flex: 1, backgroundColor: '#2ecc71'},
  //   row: {height: 28},
  //   text: {textAlign: 'center'},
  // });
  const [markets, setMarkets] = useState(null);

  // useEffect(async() => {
  //   axios({
  //     method: 'get',
  //     url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
  //   })
  //   .then((response) => {
  //     setMarkets(response.data)
  //   })
  //   .catch((error) => {
  //     console.log(error.message);
  //   })
  // });
  // if(!markets) return null;
  handleClick = () => {
    alert('Button clicked!');
  };
  return (
    // <SafeAreaView style={{flex: 1}}>
    //   <View
    //     style={{
    //       height: '8%',
    //       width: '100%',
    //       flexDirection: 'row',
    //       alignItems: 'center',
    //       justifyContent: 'space-between',
    //     }}>
    //     <View></View>
    //     <TouchableOpacity
    //       style={{
    //         height: '100%',
    //         aspectRatio: 1.7,
    //         alignItems: 'center',
    //       }}></TouchableOpacity>
    //   </View>
    //   <View
    //     style={{
    //       flex: 1,
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       flexDirection: 'row',
    //     }}>
    //     <TouchableOpacity
    //       style={{
    //         width: 60,
    //         height: 30,
    //         borderWidth: 1,
    //         borderRadius: 5,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}>
    //       <Text>GET</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{
    //         width: 60,
    //         height: 30,
    //         borderWidth: 1,
    //         borderRadius: 5,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}>
    //       <Text>GET</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{
    //         width: 60,
    //         height: 30,
    //         borderWidth: 1,
    //         borderRadius: 5,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}>
    //       <Text>GET</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{
    //         width: 60,
    //         height: 30,
    //         borderWidth: 1,
    //         borderRadius: 5,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}>
    //       <Text>GET</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <Text
    //     style={{
    //       fontSize: 20,
    //       borderWidth: 1,
    //       borderRadius: 2,
    //       height: 500,
    //     }}
    //     numberOfLines={0}>
    //       {markets}
    //     </Text>
    // </SafeAreaView>
    // <SafeAreaView>
      <View>
        <Button onPress={() => this.handleClick()} title="Click ME" color="blue" />
      </View>
      //{
        //markets && markets.map((market) => (
          //<Text>{market.name}</Text>
        //))
      //}}
      //{<Text>Hello</Text>
    //</SafeAreaView>}
  );
};

export default Markets;
