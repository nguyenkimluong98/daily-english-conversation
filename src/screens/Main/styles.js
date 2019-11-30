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
  searchBar: {
    width: Constants.screen.width * 0.8,
    height: (Constants.screen.width * 0.8 * 184) / 1108
  },
  searchBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10
  }
});
