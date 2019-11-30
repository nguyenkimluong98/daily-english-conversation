import { StyleSheet } from "react-native";
import Constants from "../../constants/Constants";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    width: Constants.screen.width * 0.6,
    height: (Constants.screen.width * 0.6 * 204) / 888,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10
  },
  wrapper: {
    marginTop: Constants.screen.height * 0.3,
    alignItems: "center",
    width: "100%"
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "300",
    color: "black",
    fontFamily: "F thin"
  }
});
