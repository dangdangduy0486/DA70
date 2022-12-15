import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { COLORS } from "../../color/Color";
import React, { useState } from "react";
const images = [
  "https://images.unsplash.com/photo-1631758236057-0aedf1bc584d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
  "https://images.unsplash.com/photo-1590282525851-a376d2ae813a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvaW58ZW58MHwwfDB8YmxhY2t8&auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1519162584292-56dfc9eb5db4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29pbnxlbnwwfDB8MHxibGFja3w%3D&auto=format&fit=crop&w=600&q=60",
];
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const Casourel = () => {
  const [imgActive, setImgActive] = useState(0);
  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
        >
          {images.map((e, index) => (
            <Image
              key={e}
              source={{ uri: e }}
              resizeMode="stretch"
              style={styles.wrap}
            />
          ))}
        </ScrollView>
        <View style={styles.wrapdot}>
          {images.map((e, index) => (
            <Text
              key={e}
              style={imgActive == index ? styles.dotActive : styles.dot}
            >
              ●
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Casourel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.3,
  },
  wrapdot: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    color: COLORS.yellow1,
    margin: 2,
  },
  dot: {
    color: "white",
    margin: 2,
  },
});
