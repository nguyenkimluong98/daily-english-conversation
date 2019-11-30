import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Constants from "../../constants/Constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  categoryWrapper: {
    width: Constants.screen.width * 0.9,
    height: (Constants.screen.width * 0.9 * 294) / 966,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: Constants.screen.width,
    paddingHorizontal: 10,
    justifyContent: "space-between"
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  textHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "orange",
    fontFamily: "F black",
    marginLeft: 10
  }
});
