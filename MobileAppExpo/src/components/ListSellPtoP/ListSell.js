import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../../color/Color";

const ListSell = ({ name, currency, amount, date, onPress, price }) => {
  return (
    <View>
      <View style={styles.coinWrapper}>
        {/* left */}
        <View style={styles.left}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.text}>Price : {price}</Text>
            <Text style={styles.text}>Currency : {currency}</Text>
            <Text style={styles.text}>Amount : {amount}</Text>
            <Text style={styles.text}>{date}</Text>
          </View>
        </View>
        {/* right */}
        <View style={styles.right}>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: COLORS.yellow1,
              borderRadius: 7,
            }}
            onPress={onPress}
          >
            <Text style={{ fontWeight: "bold" }}>Sell</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ListSell;

const styles = StyleSheet.create({
  coinWrapper: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    color: "white",
    fontSize: 10,
  },
  title: {
    color: "white",
    fontSize: 19,
  },
  right: {
    justifyContent: "center",
  },
});
