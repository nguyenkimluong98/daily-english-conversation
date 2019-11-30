import { StyleSheet } from "react-native";
import Constants from "../../constants/Constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
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
  },
  title: {
    fontSize: 13,
    fontWeight: "500",
    color: "black",
    marginVertical: 10
  },
  detail: {
    fontSize: 16,
    fontWeight: "300",
    color: "gray",
    flexWrap: "wrap",
    flex: 1
  }
});
