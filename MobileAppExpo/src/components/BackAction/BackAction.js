import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../color/Color";
import { useRoute } from "@react-navigation/native";
const BackAction = () => {
  const navigation = useNavigation();
  const hihi = () => {
    navigation.navigate("Market");
  };
  return (
    <View
      style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "white",
        paddingBottom: 16,
      }}
    >
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={hihi}
        >
          <MaterialCommunityIcons
            name="arrow-left-circle"
            size={30}
            style={{ color: COLORS.yellow1, paddingRight: 5 }}
          />
          <Text h3 style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BackAction;

const styles = StyleSheet.create({});
