import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import Constants from "../../constants/Constants";
import constant from "../../constants/Constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardItem: {
    width: constant.screen.width * 0.7,
    height: (constant.screen.width * 0.7 * 244) / 1000,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  cardText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    fontFamily: "F black"
  }
});
