import { StyleSheet } from "react-native";
import { COLORS } from "../../color/Color";
const HomeCss = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  textCo: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  appButtonContainer: {
    elevation: 5,
    backgroundColor: COLORS.yellow1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 12,
  },
  market: {
    backgroundColor: "black",
    color: "red",
    paddingHorizontal: 5,
    borderColor: "red",
    borderWidth: 1,
  },
});
export default HomeCss;
